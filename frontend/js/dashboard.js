document.addEventListener('DOMContentLoaded', () => {
  const totalExpensesCard = document.querySelector(
    '.dashboard-cards .card:nth-child(1)'
  );
  const budgetUsedCard = document.querySelector(
    '.dashboard-cards .card:nth-child(2)'
  );
  const remainingBudgetCard = document.querySelector(
    '.dashboard-cards .card:nth-child(3)'
  );

  // Fetch dashboard data
  fetch('/api/dashboard')
    .then(response => response.json())
    .then(data => {
      totalExpensesCard.innerText = `Total Expenses: $${data.totalExpenses}`;
      budgetUsedCard.innerText = `Budget Used: $${data.budgetUsed}`;
      remainingBudgetCard.innerText = `Remaining Budget: $${data.remainingBudget}`;
    })
    .catch(error => console.error('Error fetching dashboard data:', error));
});
