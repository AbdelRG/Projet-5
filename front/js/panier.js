export function getCart() {
  const cart = localStorage.getItem("cart");

  if (!cart) {
    return [];
  }
  return JSON.parse(cart);
}
export function deleteCart() {}
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
