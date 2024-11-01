document.addEventListener('DOMContentLoaded', () => {
  const expenseList = document.getElementById('expenseList');

  // Fetch expenses and display in table
  fetch('/api/expense')
    .then(response => response.json())
    .then(data => {
      data.forEach(expense => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${expense.amount}</td>
          <td>${new Date(expense.date).toLocaleDateString()}</td>
          <td>${expense.description || ''}</td>
          <td>${expense.category}</td>
          <td>${expense.paymentMethod}</td>
          <td>
            <button onclick="editExpense(${expense.id})">Edit</button>
            <button onclick="deleteExpense(${expense.id})">Delete</button>
          </td>
        `;

        expenseList.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching expenses:', error));
});

// Function to delete an expense
function deleteExpense(id) {
  fetch(`/api/expense/delete/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      window.location.reload(); // Reload to see updated list
    })
    .catch(error => console.error('Error deleting expense:', error));
}
