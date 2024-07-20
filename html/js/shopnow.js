// Example JavaScript to dynamically populate order details on ordersummary.html

document.addEventListener('DOMContentLoaded', function() {
    const orderItemsList = document.querySelector('.order-items');
    const totalAmountDisplay = document.getElementById('total-amount');

    // Example data (you should replace this with your actual data handling)
    const orderData = JSON.parse(localStorage.getItem('orderData'));

    if (orderData && orderData.length > 0) {
        let totalAmount = 0;

        orderData.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;

            const orderItemHTML = `
                <li>
                    <span>${index + 1}. ${item.product} (${item.quantity} pcs)</span>
                    <span>Rp. ${itemTotal.toLocaleString()}</span>
                </li>
            `;
            orderItemsList.innerHTML += orderItemHTML;
        });

        // Display total amount
        totalAmountDisplay.textContent = `Rp. ${totalAmount.toLocaleString()}`;
    } else {
        // Handle case when there are no orders
        orderItemsList.innerHTML = '<li>No items in order</li>';
        totalAmountDisplay.textContent = `Rp. 0`;
    }
});
