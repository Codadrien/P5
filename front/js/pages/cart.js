let cartLocalStorage = JSON.parse(localStorage.getItem("cart"));

// trouver l'élément du panier ayant le même ID et la même couleur que l'api
function displayProducts(products) {
    cartLocalStorage.forEach(product => {
        dataProduct = products.find(item => item._id === product.id);
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
        quantity = document.createElement("input");
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

//reduire
function totalQuantityAndPrice(products) {
    let arrayPrice = [];
    let arrayQuantity = [];
    cartLocalStorage.forEach(product => {
        dataProduct = products.find(item => item._id === product.id);
        arrayPrice.push(dataProduct.price);
        arrayQuantity.push(parseInt(product.quantity));
        tPrice = 0;
        tQuantity = arrayQuantity.reduce((acc, val) => acc + val, 0);
        for (let i = 0; i < arrayPrice.length; i++) {
            tPrice += arrayPrice[i] * arrayQuantity[i];
        }
    });
    if (cartLocalStorage.length !== 0) {
        totalQuantity.textContent = tQuantity;
        totalPrice.textContent = tPrice;
    } else {
        totalQuantity.textContent = 0;
        totalPrice.textContent = 0;
    }
}

function quantityListener(products) {
    const inputQuantity = document.querySelectorAll(".itemQuantity");
    inputQuantity.forEach(item => {
        item.addEventListener("input", function () {
            let inputQuantityValue = item.value;
            const cart__item = item.closest(".cart__item")
            const dataId = cart__item.dataset.id;
            const datacolor = cart__item.dataset.color;
            index = cartLocalStorage.findIndex(item => item.id === dataId && item.color === datacolor);
            cartLocalStorage[index].quantity = inputQuantityValue;

            // sauvegarde les données du panier dans le localStorage
            localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
            totalQuantityAndPrice(products);
        });
    });
}

function deleteProducts(products) {
    const deleteItems = document.querySelectorAll(".deleteItem");
    deleteItems.forEach((deleteItem) => {
        deleteItem.addEventListener("click", function () {
            console.log("deleteItem")
            const cart__item = deleteItem.closest(".cart__item")
            const dataId = cart__item.dataset.id;
            const datacolor = cart__item.dataset.color;
            index = cartLocalStorage.findIndex(item => item.id === dataId && item.color === datacolor);
            console.log("index", index)
            cartLocalStorage.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
            cart__item.remove();
            totalQuantityAndPrice(products)
        });
    });
}


function orderListener() {
    const cartFrom = document.querySelectorAll(".cart__order__form__question");
    cartFrom.forEach((item) => {
        item.addEventListener("input", function () {
            checkForm();
        });
    });
}

function checkForm() {
    const firstName = document.getElementById("firstName");
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    if (firstName.value) {
        if (!firstName.value.match(/^[a-z-|à-ü]+$/i)) {
            firstNameErrorMsg.textContent = "Le prénom doit seulement contenir des lettres sans espace";
        } else {
            firstNameErrorMsg.textContent = "";
        }
    }
    const lastName = document.getElementById("lastName");
    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    if (lastName.value) {
        if (!lastName.value.match(/^[a-z-|à-ü]+$/i)) {
            lastNameErrorMsg.textContent = "Le nom doit seulement contenir des lettres sans espace";
        } else {
            lastNameErrorMsg.textContent = "";
        }
    }

    const address = document.getElementById("address");
    const addressErrorMsg = document.getElementById("addressErrorMsg");
    if (address.value) {
        if (!address.value.match(/^[a-z- |à-ü|0-9]+$/i)) {
            addressErrorMsg.textContent = "L'adresse doit seulement contenir des lettres et des chiffres";
        } else {
            addressErrorMsg.textContent = "";
        }
    }
    const city = document.getElementById("city");
    const cityErrorMsg = document.getElementById("cityErrorMsg");
    if (city.value) {
        if (!city.value.match(/^[a-z- |à-ü]+$/i)) {
            console.log("faux");
            cityErrorMsg.textContent = "La ville doit seulement contenir des lettres";
        } else {
            console.log("vrai");
            cityErrorMsg.textContent = "";
        }
    }

    const email = document.getElementById("email");
    const emailErrorMsg = document.getElementById("emailErrorMsg");
    if (email.value) {
        if (!email.value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
            emailErrorMsg.textContent = "Adresse mail invalide";
        } else {
            emailErrorMsg.textContent = "";
        }
    }
}
async function init() {
    const products = await getProducts();
    totalQuantityAndPrice(products);
    displayProducts(products);
    totalQuantityAndPrice(products);
    quantityListener(products);
    deleteProducts(products);
    orderListener();
}

init();