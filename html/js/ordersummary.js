document.addEventListener('DOMContentLoaded', function() {
    const shopNowButtons = document.querySelectorAll('.shop-now-btn');

    shopNowButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            // Get product details from data attributes
            const productName = button.dataset.product;
            const price = parseInt(button.dataset.price);

            // Example: Save product details to localStorage
            const orderItem = {
                product: productName,
                price: price,
                quantity: 1 // Example initial quantity
            };

            // Retrieve existing order items from localStorage or initialize if empty
            let orderData = JSON.parse(localStorage.getItem('orderData')) || [];

            // Check if item already exists in cart, increase quantity if so
            const existingItemIndex = orderData.findIndex(item => item.product === productName);
            if (existingItemIndex !== -1) {
                orderData[existingItemIndex].quantity++;
            } else {
                orderData.push(orderItem);
            }

            // Save updated order data back to localStorage
            localStorage.setItem('orderData', JSON.stringify(orderData));

            // Redirect to order summary page
            window.location.href = 'ordersummary.html';
        });
    });
});
