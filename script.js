// Replace with your Google Sheets JSON URL
const SHEET_URL = "YOUR_JSON_FEED_URL";

fetch(SHEET_URL)
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById("product-grid");

    data.forEach((item, index) => {
      let card = document.createElement("div");
      card.className = "product";

      card.innerHTML = `
        <img src="${item.ImageURL}" alt="${item.Title}">
        <div class="product-content">
          <h3>${item.Title}</h3>
          <p>${item.Description}</p>
          <p><strong>$${item.Price}</strong></p>
          <div id="paypal-btn-${index}"></div>
        </div>
      `;
      grid.appendChild(card);

      // PayPal Button
      paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              description: item.Title,
              amount: { value: item.Price }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(details => {
            alert(`Thanks, ${details.payer.name.given_name}!`);
          });
        }
      }).render(`#paypal-btn-${index}`);
    });
  });
