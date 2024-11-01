document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addBudgetForm');
  const categorySelect = document.getElementById('category');

  // Fetch categories for the dropdown
  fetch('/api/categories')
    .then(response => response.json())
    .then(categories => {
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    });

  // Handle form submission
  form.addEventListener('submit', event => {
    event.preventDefault();
    const budgetData = {
      amount: document.getElementById('amount').value,
      category: categorySelect.value,
      startDate: document.getElementById('startDate').value,
      endDate: document.getElementById('endDate').value,
    };

    fetch('/api/budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(budgetData),
    })
      .then(response => response.json())
      .then(data => alert(data.message))
      .catch(error => console.error('Error:', error));
  });
});
