// recupére les données de l'api
export async function getProducts() {
    const response = await fetch("http://localhost:3000/api/products");
    return await response.json();
}

// recupére les données de l'api avec un paramètre
export async function getProduct(id) {
    const response = await fetch("http://localhost:3000/api/products/" + id);
    return await response.json();
}

// envoie les données à l'api et recupère la réponse
export async function sendOrder(contact, products) {
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