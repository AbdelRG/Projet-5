export function getCart() {
  const cart = localStorage.getItem("cart");

  if (!cart) {
    return [];
  }
  return JSON.parse(cart);
}
export function deleteCart(dataColor, dataId) {
  var cart = getCart();
  const productNumber = cart.findIndex(function (product) {
    return product.color === dataColor && product.id === dataId;
  });

  console.log(productNumber);
  cart.splice(productNumber, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
}
export function addProductCart(product) {
  const colorProduct = product.color;
  const idProduct = product.id;
  var cart = getCart();
  var isntIn = false;

  if (cart.length == 0) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    for (let i = 0; i < cart.length; i++) {
      if (
        cart[i] &&
        cart[i].color === colorProduct &&
        cart[i].id === idProduct
      ) {
        isntIn = true;
        cart[i].quantity = Number(cart[i].quantity) + Number(product.quantity);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }

    if (!isntIn) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
}

export function setCart(dataColor, dataId, newQuantity) {
  var cart = getCart();
  const productNumber = cart.findIndex(function (product) {
    return product.color === dataColor && product.id === dataId;
  });

  cart[productNumber].quantity = newQuantity;

  localStorage.setItem("cart", JSON.stringify(cart));
}
