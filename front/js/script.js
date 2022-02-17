let section = document.getElementById("items");
const setProducts = (products) => {
  products.forEach((product) => {
    const a = document.createElement("a");
    a.href = `./product.html?id=${product._id}`;
    section.appendChild(a);
    const article = document.createElement("article");
    a.appendChild(article);
    const img = document.createElement("img");
    img.src = `${product.imageUrl}`;
    img.alt = `${product.altTxt}, ${product.name}`;
    article.appendChild(img);
    const h3 = document.createElement("h3");
    h3.setAttribute("class", "productName");
    h3.innerHTML = `${product.name}`;
    article.appendChild(h3);
    const p = document.createElement("p");
    p.setAttribute("class", "productDescription");
    p.innerHTML = `${product.description}`;
    article.appendChild(p);
  });
};

const getProducts = () => {
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (products) {
      setProducts(products);
    })
    .catch(function (err) {});
};

getProducts();
