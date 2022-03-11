const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId");
const orderIdP = document.getElementById("orderId");
orderIdP.innerHTML = orderId;
