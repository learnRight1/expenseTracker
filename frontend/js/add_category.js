// Ensure your code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Function to fetch categories
  async function fetchCategories() {
    try {
      const response = await fetch('http://localhost:3000/api/category'); // Ensure the URL is correct
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const categories = await response.json(); // Parse the response JSON
      populateCategorySelect(categories); // Call the function to populate the select
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  // Function to populate the select element with categories
  function populateCategorySelect(categories) {
    const categorySelect = document.getElementById('categorySelect'); // Ensure this ID matches your HTML
    categorySelect.innerHTML = ''; // Clear existing options

    categories.forEach(category => {
      const option = document.createElement('option'); // Create a new option element
      option.value = category.id; // Set the value to the category ID
      option.textContent = category.name; // Set the display text to the category name
      categorySelect.appendChild(option); // Append the option to the select element
    });
  }

  // Function to add a category
  async function addCategory() {
    // Get the category name and user ID from the input fields
    const categoryName = document.getElementById('categoryName').value; // ID matches HTML
    const userId = document.getElementById('userId').value; // Get User ID from input

    // Validate category name
    if (!categoryName) {
      console.error('Category name is required');
      return; // Exit if no category name is provided
    }

    try {
      // Send POST request to the server
      const response = await fetch('http://localhost:3000/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: categoryName, // Send the category name
          user_id: userId, // Send the user ID
        }),
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // Parse the response JSON
      console.log(data); // Log the response data

      // Optionally, you can call fetchCategories here again to refresh the category list
      fetchCategories(); // Refresh the category select after adding a new one
    } catch (error) {
      console.error('Error:', error); // Log any errors
    }
  }

  // Add event listener for form submission
  document
    .getElementById('addCategoryForm')
    .addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission
      addCategory(); // Call the function to add the category
    });

  // Call fetchCategories when the window loads
  fetchCategories(); // Fetch categories when the page is loaded
});
