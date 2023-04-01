import {getProducts} from '../utils/api.js';

//////////////////////////////////////////////////////

async function init() {
    const products = await getProducts();
    displayProducts(products);
}

init();

function displayProducts(products) {
    products.forEach((product) => {
        // Création balise a
        const link = document.createElement("a");
        link.href = "./product.html?id=" + product._id;
        // Création balise article
        const article = document.createElement("article");
        // Création balise img
        const img = document.createElement("img");
        img.src = product.imageUrl;
        img.alt = product.altTxt + ", " + product.name;
        // Création balise h3
        const productName = document.createElement("h3");
        productName.classList.add("productName");
        productName.textContent = product.name;
        // Création balise p
        const productDescription = document.createElement("p");
        productDescription.classList.add("productDescription");
        productDescription.textContent = product.description;
        // Récupération de l'élément du DOM qui accueillera les produits
        const items = document.querySelector(".items");
        // On rattache les balises à leurs parents
        items.appendChild(link);
        link.appendChild(article);
        article.appendChild(img);
        article.appendChild(productName);
        article.appendChild(productDescription);
    });
}