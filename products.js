let html = "";

products.forEach((product) => {
    const topSellerBadge = product.name === "POCO X6 Pro" ? '<span style="background: gold; color: #333; padding: 2px 8px; border-radius: 20px; font-size: 12px; margin-left: 8px;">⭐ TOP SELLER</span>' : '';
    
    // Check if product is available to show different button
    const isAvailable = product.isAvailable;
    const buttonHtml = isAvailable 
        ? '<button class="add-button" data-available="true" data-name="' + product.name + '">Add to Cart</button>'
        : '<button class="add-button unavailable" data-available="false" data-name="' + product.name + '">Unavailable</button>';
    
    html += `
    <div>
        <p>${product.name}${topSellerBadge}</p>
        <p>Price: ₱${product.price}</p>
        <p>Stocks: ${product.qty}</p>
        <p>${product.isAvailable === true ? "Available" : "Not Available"}</p>
        ${buttonHtml}
    </div>
    `;
});

document.getElementById("product-parent").innerHTML = html;

document.querySelectorAll(".add-button").forEach((button) => {
    button.addEventListener("click", function() {
        const isAvailable = this.getAttribute("data-available") === "true";
        const productName = this.getAttribute("data-name");
        
        if (!isAvailable) {
            alert(`${productName} is out of stock!`);
            return;
        }
        
        incrementCart();
    });
});