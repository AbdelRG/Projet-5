import { getCart } from "./panier.js";
import { deleteCart } from "./panier.js";
import { setCart } from "./panier.js";
var productInfo = false;
var totalPrice = 0;
var totalQuantity = 0;
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
  var totalPriceArticle = Number(productInfo.price) * Number(product.quantity);

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
  pPrice.innerHTML = productInfo.price * product.quantity + "€";
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
  input.addEventListener("change", function () {
    var r1 = input.closest("article > div");
    var r2 = r1.closest(":not(div)");
    const dataId = r2.getAttribute("data-id");
    const dataColor = r2.getAttribute("data-color");

    const newQuantity = this.value;
    pQuantity.innerHTML = "Qté :" + newQuantity;
    pPrice.innerHTML = productInfo.price + "€";
    var deltaQuantity = newQuantity - product.quantity;

    var deltaTotalPriceArticle = productInfo.price * deltaQuantity;

    totalUpdate(deltaTotalPriceArticle, deltaQuantity);

    product.quantity = newQuantity;
    setCart(dataColor, dataId, newQuantity);
  });
  const div6 = document.createElement("div");
  div6.setAttribute("class", "cart__item__content__settings__delete");
  div4.appendChild(div6);
  const pDelete = document.createElement("p");
  pDelete.setAttribute("class", "deleteItem");
  pDelete.innerHTML = "Supprimer";

  div6.appendChild(pDelete);
  pDelete.addEventListener("click", function () {
    var r3 = pDelete.closest("article > div");

    var r4 = r3.closest(":not(div)");

    const dataId = r4.getAttribute("data-id");
    const dataColor = r4.getAttribute("data-color");

    r4.remove();
    deleteCart(dataColor, dataId);
    var deltaPrice = productInfo.price * -product.quantity;
    totalUpdate(deltaPrice, -product.quantity);
  });

  totalUpdate(totalPriceArticle, product.quantity);
};
const totalUpdate = (totalPriceArticle, quantity) => {
  const pTotalQuantity = document.getElementById("totalQuantity");

  const pTotalPrice = document.getElementById("totalPrice");
  totalQuantity += Number(quantity);
  pTotalQuantity.innerHTML = `${totalQuantity}`;
  totalPrice += totalPriceArticle;

  pTotalPrice.innerHTML = `${totalPrice}`;
};

const showCartProduct = () => {
  if (cart.length > 0) {
    cart.forEach((product) => {
      getProductById(product);
    });
  }
};

showCartProduct();
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");

firstName.oninput = function () {
  var value = this.value;
  const regex = new RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$");

  if (regex.test(value)) {
    firstNameErrorMsg.innerHTML = "champ valide";
    return value;
  } else {
    firstNameErrorMsg.innerHTML = "Le prénom n'est pas valide";
  }
};
lastName.oninput = function () {
  var value = this.value;
  const regex = new RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$");

  if (regex.test(value)) {
    lastNameErrorMsg.innerHTML = "champ valide";
    return value;
  } else {
    lastNameErrorMsg.innerHTML = "Le nom n'est pas valide";
  }
};
address.oninput = function () {
  var value = this.value;
  const regex = new RegExp("([0-9]*) ?([a-zA-Z,. ]*) ?([0-9]{5})");

  if (regex.test(value)) {
    addressErrorMsg.innerHTML = "champ valide";
    return value;
  } else {
    addressErrorMsg.innerHTML =
      "adresse invalide ,exemple d'adresse: 18 rue bidon 75000";
  }
};
city.oninput = function () {
  var value = this.value;
  const regex = new RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$");

  if (regex.test(value)) {
    cityErrorMsg.innerHTML = "champ valide";
    return value;
  } else {
    cityErrorMsg.innerHTML = "Le nom de la ville n'est pas valide";
  }
};
email.oninput = function () {
  var value = this.value;
  const regex = new RegExp(
    "^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$"
  );

  if (regex.test(value)) {
    emailErrorMsg.innerHTML = "champ valide";

    return value;
  } else {
    emailErrorMsg.innerHTML = "L adresse email n'est pas valide";
  }
};

const btn = document.getElementById("order");
btn.addEventListener("click", function (event) {
  if (
    emailErrorMsg.innerHTML == "champ valide" &&
    cityErrorMsg.innerHTML == "champ valide" &&
    addressErrorMsg.innerHTML == "champ valide" &&
    lastNameErrorMsg.innerHTML == "champ valide" &&
    firstNameErrorMsg.innerHTML == "champ valide"
  ) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;

    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;
    const contact = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    };

    const sendOrder = (contact) => {
      const products = getCart();
      let arrayProductId = [];

      products.forEach((product) => {
        arrayProductId.push(product.id);
      });

      const objectFinal = {
        contact,
        products: arrayProductId,
      };
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectFinal),
      })
        .then(function (res) {
          if (res.ok) {
            res.json().then(function (data) {
              const orderId = data.orderId;
              window.location.replace(`./confirmation.html?orderId=${orderId}`);
            });
          }
        })
        .catch(function (err) {
          throw err;
        });
    };
    sendOrder(contact);
  } else {
    event.preventDefault();
    alert("champ incomplet");
  }
});
