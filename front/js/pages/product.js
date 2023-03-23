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
    selectedColor = document.getElementById("colors").value;
    if (!selectedColor) {
        alert("Choisissez une couleur");
        return;
    }
}

function checkQuantity() {
    selectedQuantity = document.getElementById("quantity").value;
    if (selectedQuantity < 1 || selectedQuantity > 100) {
        alert("Choisissez une une quantité entre 1 et 100");
        return;
    }
}

function setUpAddToCart(product) {

    addToCart.addEventListener("click", (e) => {
        e.preventDefault();
        checkColors();
        checkQuantity();

        // créer un objet contenant les informations du produit sélectionné
        const selectedProduct = {
            color: colors.value,
            quantity: parseInt(quantity.value),
            id: product._id,
        };
        const cart = new Cart();
        cart.addItem(selectedProduct);
        window.confirm("Votre sélection a bien été prise en compte");
        window.location.assign("cart.html");
    });
}

async function init() {
    const id = getId();
    const product = await getProduct(id);
    displayProduct(product);
    setUpAddToCart(product);
}

init();