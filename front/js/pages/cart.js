import {
    popUp
}
from '../utils/popUp.js';

// import utils from '../utils/popUp.js';

// trouver l'élément du panier ayant le même ID et la même couleur que l'api
function displayProducts(products, cart) {
    cart.getItems().forEach(product => {
        let dataProduct = products.find(item => item._id === product.id);
        const article = document.createElement("article");
        article.className = "cart__item";
        article.setAttribute('data-id', `${product.id}`);
        article.setAttribute('data-color', `${product.color}`);
        const itemImg = document.createElement("div");
        itemImg.className = "cart__item__img";
        const img = document.createElement("img");
        img.src = dataProduct.imageUrl;
        img.alt = dataProduct.altTxt + ", " + dataProduct.name;
        const itemContent = document.createElement("div");
        itemContent.className = "cart__item__content";
        const itemDescription = document.createElement("div");
        itemDescription.className = "cart__item__content__description";
        const productName = document.createElement("h2");
        productName.textContent = dataProduct.name;
        const color = document.createElement("p");
        color.textContent = product.color;
        const price = document.createElement("p");
        price.textContent = dataProduct.price + " €";
        const contentSettings = document.createElement("div");
        contentSettings.className = "cart__item__content__settings";

        const settingsQuantity = document.createElement("div");
        settingsQuantity.className = "cart__item__content__settings__quantity";
        // Créer l'élément input avec tous les attributs
        let quantity = document.createElement("input");
        quantity.type = "number";
        quantity.classList.add("itemQuantity");
        quantity.name = "itemQuantity";
        quantity.min = 1;
        quantity.max = 100;
        quantity.value = product.quantity;

        const settingsDelete = document.createElement("div");
        settingsDelete.className = "cart__item__content__settings__delete";
        const deleteItem = document.createElement("p");
        deleteItem.className = "deleteItem";
        deleteItem.textContent = "Supprimer";

        // Récupération de l'élément du DOM qui accueillera les produits
        const items = document.getElementById("cart__items");
        // On rattache les balises à leurs parents
        items.appendChild(article);
        article.appendChild(itemImg);
        itemImg.appendChild(img);
        article.appendChild(itemContent);
        itemContent.appendChild(itemDescription);
        itemDescription.appendChild(productName);
        itemDescription.appendChild(color);
        itemDescription.appendChild(price);
        itemContent.appendChild(contentSettings);
        contentSettings.appendChild(quantity);
        itemContent.appendChild(settingsDelete);
        settingsDelete.appendChild(deleteItem);

    });
}

function checkCartNotEmpty(cart) {
    if (cart.getItems().length === 0) {
        document.querySelector('.cart').style.display = 'none';
        document.querySelector('.cartAndFormContainer h1').textContent = 'Votre panier est vide.';
    }
}

function quantityListener(products, cart) {
    const inputQuantity = document.querySelectorAll(".itemQuantity");
    inputQuantity.forEach(item => {
        item.addEventListener("input", () => {
            let inputQuantityValue = parseInt(item.value);
            const cart__item = item.closest(".cart__item")
            const dataId = cart__item.dataset.id;
            const datacolor = cart__item.dataset.color;
            cart.quantityListener(dataId, datacolor, inputQuantityValue)
            totalQuantityAndPrice(products, cart);
            popUp("Changement de quantité pris en compte", "popUpConfirm");
        });
    });
}

function deleteProducts(products, cart) {
    const deleteItems = document.querySelectorAll(".deleteItem");
    deleteItems.forEach((deleteItem) => {
        deleteItem.addEventListener("click", function () {
            const cart__item = deleteItem.closest(".cart__item")
            const dataId = cart__item.dataset.id;
            const datacolor = cart__item.dataset.color;
            cart.deleteProducts(dataId, datacolor);
            totalQuantityAndPrice(products, cart);
            cart__item.remove();
            popUp("Produit supprimer", "popUpConfirm");
            checkCartNotEmpty(cart);
        });
    });
}

function totalQuantityAndPrice(products, cart) {
    cart.addPriceToItems(products);
    cart.getTotalValue(products);
}

function formListener() {
    const cartFrom = document.querySelectorAll(".cart__order__form__question");
    cartFrom.forEach((item) => {
        item.addEventListener("input", () => {
            checkForm();
        });
    });
}

async function init() {
    const products = await getProducts();
    const cart = new Cart();
    checkCartNotEmpty(cart);
    displayProducts(products, cart);
    quantityListener(products, cart);
    totalQuantityAndPrice(products, cart);
    deleteProducts(products, cart);
    formListener();
    orderListener(cart);
}

init();