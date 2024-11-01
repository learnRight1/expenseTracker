document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addExpenseForm');
  const categorySelect = document.getElementById('category');
  const paymentMethodSelect = document.getElementById('paymentMethod');

  // Fetch categories for the dropdown
  fetch('http://localhost:3000/api/category')
    .then(response => response.json())
    .then(categories => {
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching categories:', error));

  // Fetch payment methods for the dropdown
  fetch('http://localhost:3000/api/paymentMethod')
    .then(response => response.json())
    .then(methods => {
      methods.forEach(method => {
        const option = document.createElement('option');
        option.value = method.id;
        option.textContent = method.name;
        paymentMethodSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching payment methods:', error));

  // Handle form submission
  form.addEventListener('submit', event => {
    event.preventDefault();
    const expenseData = {
      amount: document.getElementById('amount').value,
      date: document.getElementById('date').value,
      description: document.getElementById('description').value,
      category: categorySelect.value,
      paymentMethod: paymentMethodSelect.value,
    };

    fetch('http://localhost:3000/api/expense/add', {
      // Corrected URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData),
    })
      .then(response => response.json())
      .then(data => alert(data.message))
      .catch(error => console.error('Error adding expense:', error));
  });
});
