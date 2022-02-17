import { getCart } from "./panier.js";
var productInfo = false;
const cart = getCart();
const getProductById = (product) => {
  fetch(`http://localhost:3000/api/products/${product.id}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (productInfo) {
      setProduct(productInfo, product);
    })
    .catch(function (err) {});
};
const section = document.getElementById("cart__items");

const setProduct = (productInfo, product) => {
  const article = document.createElement("article");

  article.setAttribute("class", "cart__item");
  article.setAttribute("data-id", `${product.id}`);
  article.setAttribute("data-color", `${product.color}`);

  section.appendChild(article);
  const div1 = document.createElement("div");
  div1.setAttribute("class", "cart__item__img");
  article.appendChild(div1);
  const img = document.createElement("img");
  img.src = `${productInfo.imageUrl}`;
  img.alt = `${productInfo.altTxt}`;
  div1.appendChild(img);
  const div2 = document.createElement("div");
  div2.setAttribute("class", "cart__item__content");
  article.appendChild(div2);
  const div3 = document.createElement("div");
  div3.setAttribute("class", "cart__item__content__description");
  div2.appendChild(div3);
  const h2 = document.createElement("h2");
  h2.innerHTML = productInfo.name;
  div3.appendChild(h2);
  const pColor = document.createElement("p");
  pColor.innerHTML = product.color;
  div3.appendChild(pColor);
  const pPrice = document.createElement("p");
  pPrice.innerHTML = productInfo.price + "€";
  div3.appendChild(pPrice);
  const div4 = document.createElement("div");
  div4.setAttribute("class", "cart__item__content__settings");
  article.appendChild(div4);
  const div5 = document.createElement("div");
  div5.setAttribute("class", "cart__item__content__settings__quantity");
  div4.appendChild(div5);
  const pQuantity = document.createElement("p");
  pQuantity.innerHTML = "Qté :" + product.quantity;

  div5.appendChild(pQuantity);

  const input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("class", "itemQuantity");
  input.setAttribute("name", "itemQuantity");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");
  input.setAttribute("value", `${product.quantity}`);
  div5.appendChild(input);
  const div6 = document.createElement("div");
  div6.setAttribute("class", "cart__item__content__settings__delete");
  div4.appendChild(div6);
  const pDelete = document.createElement("p");
  pDelete.setAttribute("class", "deleteItem");
  pDelete.innerHTML = "Supprimer";
  div6.appendChild(pDelete);
};
const showCartProduct = () => {
  if (cart.length > 0) {
    cart.forEach((product) => {
      getProductById(product);
    });
  }
};
showCartProduct();
