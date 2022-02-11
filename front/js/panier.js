export function recuperation() {
  const cart = localStorage.getItem("cart");

  if (!cart) {
    return [];
  }
  return console.log(JSON.parse(cart));
}
export function supression() {}
export function ajouter(product) {
  const colorProduct = product.color;
  const idProduct = product.id;
  var cart = recuperation();

  if (cart.length == 0) {
    cart.push(JSON.stringify(product));
    console.log(cart);
    localStorage.setItem("cart", cart);
  } else {
    for (let i = 0; i <= cart.length; i++) {
      if (
        cart[i] &
        (cart[i].color === colorProduct) &
        (cart[i].id === idProduct)
      ) {
        const quantityProduct = (cart[i].quantity += product.quantity);
        cart[i].quantity = quantityProduct;
        //localStorage.setItem("cart", cart);
        console.log(cart);
      } else {
        cart.push(JSON.stringify(product));
        console.log(cart);
        //localStorage.setItem("cart", cart);
      }
    }
  }
}
