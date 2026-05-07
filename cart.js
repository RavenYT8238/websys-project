let cart = [];

function addToCart(name, price) {
    if (cart.find(item => item.name === name)) {
        alert(name + " is already in cart!");
        return;
    }
    cart.push({ name: name, price: price, qty: 1 });
    updateCart();
    alert(name + " added to cart!");
}

function changeQty(name, amount) {
    const item = cart.find(item => item.name === name);
    if (item) {
        const newQty = item.qty + amount;
        if (newQty <= 0) {
            cart = cart.filter(item => item.name !== name);
        } else {
            item.qty = newQty;
        }
        updateCart();
    }
}

function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

function clearCart() {
    if (confirm("Clear all items from cart?")) {
        cart = [];
        updateCart();
    }
}

function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
    } else {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].price * cart[i].qty;
        }
        alert("Total: ₱" + total.toLocaleString() + "\nThank you for shopping at Raven's Phone Shop!");
    }
}

function updateCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    const emptyMsg = document.getElementById("empty-cart");
    
    let totalQty = 0;
    let totalPrice = 0;
    let itemsHtml = "";
    
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const subtotal = item.price * item.qty;
        totalQty += item.qty;
        totalPrice += subtotal;
        
        itemsHtml += `
            <div class="cart-item">
                <p><strong>${item.name}</strong></p>
                <p>Price: ₱${item.price.toLocaleString()} x ${item.qty}</p>
                <p>Subtotal: ₱${subtotal.toLocaleString()}</p>
                <button onclick="changeQty('${item.name}', -1)">-</button>
                <button onclick="changeQty('${item.name}', 1)">+</button>
                <button onclick="removeItem('${item.name}')">Remove</button>
            </div>
        `;
    }
    
    cartCount.innerText = totalQty;
    cartTotal.innerText = totalPrice.toLocaleString();
    
    if (cart.length === 0) {
        emptyMsg.style.display = "block";
        cartItemsDiv.innerHTML = "";
    } else {
        emptyMsg.style.display = "none";
        cartItemsDiv.innerHTML = itemsHtml;
    }
}

window.changeQty = changeQty;
window.removeItem = removeItem;
window.clearCart = clearCart;
window.checkout = checkout;
