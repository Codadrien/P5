import {
    popUp
}
from '../utils/popUp.js';

function getId() {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    return url.searchParams.get("id");
}

function displayProduct(product) {
    // Création balise img
    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.altTxt + ", " + product.name;
    // Insertion des éléments
    title.textContent = product.name;
    price.textContent = product.price;
    description.textContent = product.description;

    // Récupération des éléments du DOM qui accueillera le produit
    const items_img = document.querySelector(".item__img");
    items_img.appendChild(img);
    const colorsId = document.getElementById("colors");

    //Insertion des couleurs avec une boucle for
    for (let i = 0; i < product.colors.length; i++) {
        const option = document.createElement("option");
        option.textContent = product.colors[i];
        colorsId.appendChild(option);
    }
}

function checkColors() {
    const selectedColor = document.getElementById("colors").value;
    if (!selectedColor) {
        popUp("Choisissez une couleur", "popUpError");
        return false;
    }
    return true;
}

function checkQuantity() {
    const selectedQuantity = document.getElementById("quantity").value;
    if (selectedQuantity < 1 || selectedQuantity > 100) {
        popUp("Choisissez une une quantité entre 1 et 100", "popUpError");
        return false;
    }
    return true;
}

function setUpAddToCart(product) {

    addToCart.addEventListener("click", (e) => {
        e.preventDefault();
        if (checkColors() && checkQuantity()) {
            // créer un objet contenant les informations du produit sélectionné
            const selectedProduct = {
                color: colors.value,
                quantity: parseInt(quantity.value),
                id: product._id,
            };
            const cart = new Cart();
            cart.addItem(selectedProduct);
            popUp("Votre sélection a bien été prise en compte", "popUpConfirm");
        }
    });

}

async function init() {
    const id = getId();
    const product = await getProduct(id);
    displayProduct(product);
    setUpAddToCart(product);
}

init();