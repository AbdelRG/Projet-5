import { getCart } from "./panier.js";
import { getProductById } from "./product.js";
const cart = getCart();
const showCartProduct = () => {
  if (cart.length > 0) {
    console.log("test");
    cart.forEach((product) => {
      const productId = product.id;
      console.log("test");

      const section = document.getElementById("cart__items");
      const article = document.createElement("article");
      const productInfo = getProductById(productId);

      article.setAttribute("class", "cart__item");
      article.setAttribute("data-id", `${productId}`);
      article.setAttribute("data-color", `${product.color}`);
      article.appendChild(section);
      const div1 = document.createElement("div");
      div1.setAttribute("class", "cart__item__img");
      div1.appendChild(article);
      const img = document.createElement("img");
      img.src = `${productInfo.imageUrl}`;
      img.alt = `${productInfo.altTxt}`;
      img.appendChild(div1);
      const div2 = document.createElement("div");
      div2.setAttribute("class", "cart__item__content");
      div2.appendChild(article);
      const div3 = document.createElement("div");
      div3.setAttribute("class", "cart__item__content__description");
      div3.appendChild(div2);
      const h2 = document.createElement("h2");
      h2.innerHTML = productInfo.name;
      h2.appendChild(div3);
      const pColor = document.createElement("p");
      pColor.innerHTML = product.color;
      pColor.appendChild(div3);
      const pPrice = document.createElement("p");
      pPrice.innerHTML = productInfo.price;
      pPrice.appendChild(div3);
      const div4 = document.createElement("div");
      div4.setAttribute("class", "cart__item__content__settings");
      div4.appendChild(article);
      const div5 = document.createElement("div");
      div5.setAttribute("class", "cart__item__content__settings__quantity");
      div5.appendChild(div4);
      const pQuantity = document.createElement("p");
      pQuantity.innerHTML = product.quantity;
      pQuantity.appendChild(div5);
      const input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("class", "itemQuantity");
      input.setAttribute("name", "itemQuantity");
      input.setAttribute("min", "1");
      input.setAttribute("max", "100");
      input.setAttribute("value", `${product.quantity}`);
      input.appendChild(div5);
      const div6 = document.createElement("div");
      div6.setAttribute("class", "cart__item__content__settings__delete");
      div6.appendChild(div4);
      const pDelete = document.createElement("p");
      pDelete.setAttribute("class", "deleteItem");
      pDelete.innerHTML = "Supprimer";
      pDelete.appendChild(div6);
    });
  }
};
showCartProduct();
