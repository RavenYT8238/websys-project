let cartQty = 0;

function incrementCart() {
    cartQty++;
    document.getElementById("cart-quantity").innerText = cartQty;
    console.log("Cart quantity:", cartQty);
}

function decrementCart() {
    if (cartQty > 0) {
        cartQty--;
        document.getElementById("cart-quantity").innerText = cartQty;
    }
    console.log("Cart quantity:", cartQty);
}