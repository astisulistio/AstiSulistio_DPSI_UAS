const orderForm = document.getElementById('order-form');

orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    const orderDetails = {
        items: orderData,
        name,
        email,
        address
    };

    const token = localStorage.getItem('token'); // Assuming you have stored token in localStorage

    try {
        const response = await fetch('https://astisulistio-dpsiuas-9d8f0aaf1f7e.herokuapp.com/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Ensure you use 'Bearer' prefix
            },
            body: JSON.stringify(orderDetails)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Order placed successfully!');
            localStorage.removeItem('orderData'); // Clear order data after successful submission
            window.location.reload(); // Reload the page to reset the form
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error placing order:', error);
        alert('Error placing order');
    }
});
