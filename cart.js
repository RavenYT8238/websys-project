let cart = [];
let nextId = 1;

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        alert(name + " is already in cart!");
        return;
    }
    
    cart.push({
        id: nextId++,
        name: name,
        price: price,
        qty: 1
    });
    
    updateCart();
    alert(name + " added to cart!");
}

function changeQty(id, amount) {
    const item = cart.find(item => item.id === id);
    if (item) {
        const newQty = item.qty + amount;
        if (newQty <= 0) {
            cart = cart.filter(item => item.id !== id);
        } else {
            item.qty = newQty;
        }
    }
    updateCart();
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
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
    
    console.log("Cart items:", cart);
    
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
                <button onclick="changeQty(${item.id}, -1)">-</button>
                <button onclick="changeQty(${item.id}, 1)">+</button>
                <button onclick="removeItem(${item.id})">Remove</button>
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
