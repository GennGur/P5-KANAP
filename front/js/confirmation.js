const currentPageUrl = document.location.href;
const url = new URL(currentPageUrl);
const orderId = url.searchParams.get("order");
const orderIdSpan = document.getElementById("orderId");
const response = new URL("http://localhost:3000");
console.log(response);
orderIdSpan.textContent = `${orderId}`;