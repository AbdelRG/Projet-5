import * as panier from "./panier.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
var productInfo = false;
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (product) {
    const itemImg = document.getElementsByClassName("item__img")[0];

    const img = document.createElement("img");
    img.src = `${product.imageUrl}`;
    img.alt = `${product.altTxt}`;
    itemImg.appendChild(img);
    const h1 = document.getElementById("title");
    h1.innerHTML = `${product.name}`;
    const span = document.getElementById("price");
    span.innerHTML = `${product.price}`;
    const p = document.getElementById("description");
    p.innerHTML = `${product.description}`;
    const colorSelect = document.getElementById("colors");
    product.colors.forEach((color) => {
      const option = document.createElement("option");
      option.text = color;
      option.value = color;
      colorSelect.appendChild(option);
    });
    return (productInfo = product);
  })
  .catch(function (err) {});

const btn = document.getElementById("addToCart");
const quantity = document.getElementById("quantity");
var counter = 0;
btn.addEventListener("click", function () {
  const colorCheck = productInfo.colors;

  const select = document.getElementById("colors");
  const selectedColor = select.options[select.selectedIndex].text;

  const quantityCheck = quantity.value;

  const arraycontainscolor = colorCheck.indexOf(selectedColor) > -1;

  if (arraycontainscolor & (quantityCheck >= 1) & (quantityCheck <= 100)) {
    const cartProduct = {
      color: selectedColor,
      quantity: quantityCheck,
      id: productInfo._id,
    };
    panier.ajouter(cartProduct);
  } else {
    alert("panier incorrect");
  }
});
