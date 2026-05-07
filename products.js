function renderProducts() {
    let html = "";
    
    products.forEach((product) => {
        const topSellerBadge = product.name === "POCO X6 Pro" ? '<span style="background: gold; padding: 2px 8px; border-radius: 20px; font-size: 12px; margin-left: 8px;">⭐ TOP SELLER</span>' : '';
        
        const buttonHtml = product.isAvailable && product.qty > 0 
            ? '<button class="add-button" data-name="' + product.name + '" data-price="' + product.price + '">Add to Cart</button>'
            : '<button class="add-button disabled" disabled style="background: #999;">Out of Stock</button>';
        
        const imageHtml = product.image 
            ? '<img src="' + product.image + '" alt="' + product.name + '" class="product-img" onerror="this.style.display=\'none\'">'
            : '';
        
        html += `
        <div class="product-card">
            ${imageHtml}
            <p><strong>${product.name}${topSellerBadge}</strong></p>
            <p>Price: ₱${product.price.toLocaleString()}</p>
            <p>Stocks: ${product.qty}</p>
            <p>${product.isAvailable && product.qty > 0 ? "✅ Available" : "❌ Not Available"}</p>
            ${buttonHtml}
        </div>
        `;
    });
    
    document.getElementById("product-parent").innerHTML = html;
    
    document.querySelectorAll(".add-button:not(.disabled)").forEach((button) => {
        button.addEventListener("click", function() {
            const name = this.getAttribute("data-name");
            const price = parseInt(this.getAttribute("data-price"));
            addToCart(name, price);
        });
    });
}

renderProducts();