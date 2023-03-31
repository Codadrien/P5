class Cart {

    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }

    getItems() {
        return this.items
    }

    addItem(product) {
        // sameIdAndColor is an object in local storage, product.quantity is the current color
        const sameIdAndColor = this.items.find(item => item.id === product.id && item.color === product.color);
        if (sameIdAndColor) {
            sameIdAndColor.quantity += product.quantity;
        } else {
            this.items.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(this.items));
    }

    checkCartNotEmpty() {
        if (this.items.length === 0) {
            document.querySelector('.cart').style.display = 'none';
            document.querySelector('.cartAndFormContainer h1').textContent = 'Votre panier est vide.';
        }
    }

    quantityListener(dataId, datacolor, inputQuantityValue) {
        let index = this.items.findIndex(item => item.id === dataId && item.color === datacolor);
        this.items[index].quantity = inputQuantityValue;
        console.log("inputQuantityValue", inputQuantityValue);
        console.log("cartLocalStorage[index].quantity", inputQuantityValue);
        localStorage.setItem("cart", JSON.stringify(this.items));
    }

    deleteProducts(dataId, datacolor) {
        let index = this.items.findIndex(item => item.id === dataId && item.color === datacolor);
        this.items.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(this.items));
    }


    addPriceToItems(products) {
        this.items.forEach(item => {
            item.price = products.find(item => item.id === products._id).price;
        })
    }

    getTotalValue() {
        for (let i = 0; i < this.items.length; i++) {
            if (!this.items[i].price) {
                console.log("pas de prix");
                return -1;
            }
        }
        console.log("this.items", this.items);
        totalQuantity.textContent = this.items.reduce((acc, item) => acc + item.quantity, 0);
        totalPrice.textContent = this.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
        this.items.forEach(item => {
            console.log(item.price);
            console.log(item.quantity);
        });
    }
}