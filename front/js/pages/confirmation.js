// récupération de order id dans l'url
function getOrderId() {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    return url.searchParams.get("id");
}

// affiche le numero de commande
function displayOrderId() {
    const orderidValue = getOrderId();
    const orderid = document.getElementById("orderId");
    orderid.textContent = orderidValue;
}

displayOrderId();