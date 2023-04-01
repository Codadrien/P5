async function getProducts() {
    const response = await fetch("http://localhost:3000/api/products");
    return await response.json();
}

async function getProduct(id) {
    const response = await fetch("http://localhost:3000/api/products/" + id);
    return await response.json();
}

async function sendOrder(contact, products) {
    const response = await fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        body: JSON.stringify({
            contact,
            products,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json();
}