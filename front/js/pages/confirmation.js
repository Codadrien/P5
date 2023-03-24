function getOrderId() {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    return url.searchParams.get("id");
}

function init() {
    const orderidValue = getOrderId();
    const orderid = document.getElementById("orderId");
    orderid.textContent = orderidValue;
}

init();