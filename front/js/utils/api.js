    async function getProducts() {
        const response = await fetch("http://localhost:3000/api/products");
        return await response.json();
    }

    async function getProduct(id) {
        const response = await fetch("http://localhost:3000/api/products/" + id);
        return await response.json();
    }