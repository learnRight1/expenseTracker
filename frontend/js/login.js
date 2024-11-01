// login.js
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('error-message');
  const successMessage = document.getElementById('success-message');

  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      errorMessage.textContent = '';
      successMessage.textContent = '';

      console.log('Logging in with:', { email, password }); // Debug log

      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        console.log('Response status:', response.status); // Debug log
        const data = await response.json();

        if (response.ok) {
          successMessage.textContent = 'Login successful!';
          setTimeout(() => {
            window.location.href = 'dashboard.html'; // Redirect to your dashboard page
          }, 1500);
        } else {
          errorMessage.textContent = data.error || 'Login failed. Try again.';
        }
      } catch (error) {
        console.error('Error during login:', error); // Debug log
        errorMessage.textContent = 'An error occurred. Please try again.';
      }
    });
  }
});
