// index.js

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get login and register links
  const loginLink = document.querySelector('.login_btn a');
  const registerLink = document.querySelector('.register_btn a');

  // Event listener for login link
  loginLink.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior
      // Add your logic to show the login page or perform login actions
      console.log('Login link clicked');
      // Example: showLoginForm();
  });

  // Event listener for register link
  registerLink.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior
      // Add your logic to show the register page or perform register actions
      console.log('Register link clicked');
      // Example: showRegisterForm();
  });
});
