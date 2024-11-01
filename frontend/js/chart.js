// chart.js

// Function to fetch expense data and create the chart
async function renderExpenseChart(chartType = 'bar') {
  try {
    // Fetch expense data from backend API
    const response = await fetch('/api/expenses/data'); // Adjust this endpoint if necessary
    const data = await response.json();

    // Assuming the data structure has 'category' and 'amount' fields
    const categories = {};

    data.forEach(expense => {
      const category = expense.category; // Use the correct field name for the category
      categories[category] = (categories[category] || 0) + expense.amount;
    });

    // Prepare labels and data for the chart
    const labels = Object.keys(categories);
    const amounts = Object.values(categories);

    // Get the chart context
    const ctx = document.getElementById('expenseChart').getContext('2d');

    // Create the chart
    new Chart(ctx, {
      type: chartType, // Use the provided chart type
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Expenses',
            data: amounts,
            backgroundColor:
              chartType === 'pie'
                ? ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'] // Pie colors
                : ['#4CAF50', '#FF6384', '#36A2EB', '#FFCE56', '#A569BD'], // Bar colors
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales:
          chartType === 'bar'
            ? {
                y: {
                  beginAtZero: true,
                },
              }
            : undefined,
      },
    });
  } catch (error) {
    console.error('Error fetching or rendering data:', error);
  }
}

// Render the chart when the page loads, specify the type as needed
window.onload = () => renderExpenseChart('bar'); // Change 'bar' to 'pie' for pie chart
