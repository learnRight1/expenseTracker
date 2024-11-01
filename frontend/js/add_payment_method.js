document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addPaymentMethodForm');

  form.addEventListener('submit', event => {
    event.preventDefault();
    const paymentMethodData = {
      name: document.getElementById('paymentMethodName').value,
    };

    fetch('/api/paymentMethod/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentMethodData),
    })
      .then(response => response.json())
      .then(data => alert(data.message))
      .catch(error => console.error('Error:', error));
  });
});
