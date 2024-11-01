document.addEventListener('DOMContentLoaded', () => {
  // Login Form Handler
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault(); // Prevent the form from submitting normally

      // Get input values
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Log to the console for testing
      console.log('Username:', username);
      console.log('Password:', password);

      // TODO: Send data to backend for authentication
      // Example of redirect after successful submission
      window.location.href = 'dashboard.html'; // Redirect to dashboard if login is successful
    });
  }

  // Add Expense Handler
  const addExpenseForm = document.getElementById('addExpenseForm');
  if (addExpenseForm) {
    addExpenseForm.addEventListener('submit', e => {
      e.preventDefault();
      // Gather form data and send to backend
    });
  }

  // Edit Expense Handler
  const editExpenseForm = document.getElementById('editExpenseForm');
  if (editExpenseForm) {
    editExpenseForm.addEventListener('submit', e => {
      e.preventDefault();
      // Send updated data to backend
    });
  }

  // Add Category Handler
  const addCategoryForm = document.getElementById('addCategoryForm');
  if (addCategoryForm) {
    addCategoryForm.addEventListener('submit', e => {
      e.preventDefault();
      // Send category name to backend
    });
  }

  // Additional handlers for other forms...
});
