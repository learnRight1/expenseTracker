// register.js
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const errorMessage = document.getElementById('error-message');
  const successMessage = document.getElementById('success-message');

  if (registerForm) {
    registerForm.addEventListener('submit', async e => {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      errorMessage.textContent = '';
      successMessage.textContent = '';

      if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match!';
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          successMessage.textContent = 'Registration successful!';
          setTimeout(() => {
            window.location.href = 'index.html'; // Redirect to login page
          }, 1500);
        } else {
          errorMessage.textContent =
            data.error || 'Registration failed. Try again.';
        }
      } catch (error) {
        errorMessage.textContent = 'An error occurred. Please try again.';
      }
    });
  }
});
