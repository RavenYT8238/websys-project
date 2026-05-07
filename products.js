let html = "";

products.forEach((product) => {
    const topSellerBadge = product.name === "POCO X6 Pro" ? '<span class="top-seller">⭐ TOP SELLER</span>' : '';
    
    const buttonHtml = product.isAvailable && product.qty > 0 
        ? '<button class="add-button" data-name="' + product.name + '" data-price="' + product.price + '">Add to Cart</button>'
        : '<button class="add-button disabled" disabled>Out of Stock</button>';
    
    html += `
    <div class="product-card">
        <img src="${product.image}" class="product-img" onerror="this.src='https://placehold.co/150x150?text=No+Image'">
        <p><strong>${product.name}${topSellerBadge}</strong></p>
        <p>Price: ₱${product.price}</p>
        <p>Stocks: ${product.qty}</p>
        <p>${product.isAvailable && product.qty > 0 ? "Available" : "Not Available"}</p>
        ${buttonHtml}
    </div>
    `;
});

document.getElementById("product-parent").innerHTML = html;

document.querySelectorAll(".add-button:not(.disabled)").forEach((button) => {
    button.addEventListener("click", function() {
        addToCart(this.getAttribute("data-name"), parseInt(this.getAttribute("data-price")));
    });
});
