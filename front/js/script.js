async function getProducts() {
    const response = await fetch("http://localhost:3000/api/products");
    const product = await response.json();
    return product;
}

async function init() {
    const products = await getProducts();
    console.log(products);
    addClasses(products);
}

function addClasses(products) {
    products.forEach(function addClasse(product) {
        // Création balise a
        const link = document.createElement("a");
        link.href = "./product.html?id=" + product._id;
        // Création balise article
        const article = document.createElement("article");
        // Création balise img
        const img = document.createElement("img");
        img.src = product.imageUrl;
        img.alt = product.altTxt + "," + product.name;
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

init();






// async function getProducts() {
//     const response = await fetch("http://localhost:3000/api/products");
//     const product = await response.json();
//     return product;
// }

// async function init() {
//     const products = await getProducts();
//     console.log(products);
//     addLink(products);
//     addArticles(products);
// }

// function addLink(products) {
//     products.forEach(function addLink(product) {
//         const link = document.createElement("a");
//         link.href = "./product.html?id=" + product._id;
//         const items = document.querySelector(".items");
//         items.appendChild(link);
//     });
// }

// function addArticles(products) {
//     products.forEach(function addArticle(product) {
//         const article = document.createElement("article");
//         link.appendChild(article);
//     });
// }

// init();