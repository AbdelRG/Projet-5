const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
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
  })
  .catch(function (err) {});
