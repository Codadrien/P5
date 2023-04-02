import {
    getProduct
} from '../utils/api.js';
import {
    popUp
} from '../utils/popUp.js';
import Cart from '../components/Cart.js';

////////////////////////////////////////////////////////

// recupere l'id qui est dans l'url
function getId() {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    return url.searchParams.get("id");
}

//affiche le produit selectionné (product)
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

// verifie si la couleur est selectionnée
function checkColors() {
    const selectedColor = document.getElementById("colors").value;
    if (!selectedColor) {
        popUp("Choisissez une couleur", "popUpError");
        return false;
    }
    return true;
}

// verifie si la quantité est selectionnée
function checkQuantity() {
    const selectedQuantity = document.getElementById("quantity").value;
    if (selectedQuantity < 1 || selectedQuantity > 100) {
        popUp("Choisissez une une quantité entre 1 et 100", "popUpError");
        return false;
    }
    return true;
}

// sauvegarde le produit selectionner dans le localStorage lorsque le bouton est cliqué
function setUpAddToCart(product, cart) {
    addToCart.addEventListener("click", (e) => {
        e.preventDefault();
        if (checkColors() && checkQuantity()) {
            // créer un objet contenant les informations du produit sélectionné
            const selectedProduct = {
                color: colors.value,
                quantity: parseInt(quantity.value),
                id: product._id,
            };
            cart.addItem(selectedProduct);
            popUp("Votre sélection a bien été prise en compte", "popUpConfirm");
        }
    });

}

//permet initier différentes fonctions et variables qui sont utilisées
async function init() {
    const id = getId();
    const product = await getProduct(id);
    const cart = new Cart();
    displayProduct(product);
    setUpAddToCart(product, cart);
}

init();