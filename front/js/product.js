import * as panier from "./panier.js";
var productInfo = false;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

export const getProductById = (id) => {
  console.log(id);
  fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (product) {
      setProduct(product);
    })
    .catch(function (err) {});
};
const setProduct = (product) => {
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
};
getProductById(id);
const btn = document.getElementById("addToCart");
const quantity = document.getElementById("quantity");

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
    panier.addProductCart(cartProduct);
  } else {
    alert("panier incorrect");
  }
});
