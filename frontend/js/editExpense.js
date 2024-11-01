document.addEventListener('DOMContentLoaded', () => {
  // Step 1: Retrieve the expense ID from the URL
  const urlParts = window.location.pathname.split('/');
  const expenseId = urlParts[urlParts.length - 1]; // Assumes ID is the last part of the URL

  const form = document.getElementById('editExpenseForm');
  if (!form) {
    console.error('Form element with ID editExpenseForm not found.');
    return;
  }

  // Step 2: Fetch existing expense data
  fetch(`/api/expense/${expenseId}`)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      document.getElementById('amount').value = data.amount;
      document.getElementById('date').value = data.date.split('T')[0]; // Format date for input
      document.getElementById('description').value = data.description;
      document.getElementById('category').value = data.category;
      document.getElementById('paymentMethod').value = data.paymentMethod;
    })
    .catch(error => console.error('Error fetching expense data:', error));

  // Step 3: Handle form submission to update expense
  form.addEventListener('submit', event => {
    event.preventDefault();

    const updatedExpenseData = {
      amount: document.getElementById('amount').value,
      date: document.getElementById('date').value,
      description: document.getElementById('description').value,
      category: document.getElementById('category').value,
      paymentMethod: document.getElementById('paymentMethod').value,
    };

    fetch(`/api/expense/edit/${expenseId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedExpenseData),
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        alert(data.message);
        // Optionally redirect or perform another action after updating
      })
      .catch(error => console.error('Error updating expense:', error));
  });
});
