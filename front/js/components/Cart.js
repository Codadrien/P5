class Cart {

    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }

    getItems() {
        return this.items;
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

    quantityListener(dataId, datacolor, inputQuantityValue) {
        let index = this.items.findIndex(item => item.id === dataId && item.color === datacolor);
        this.items[index].quantity = inputQuantityValue;
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
                return -1;
            }
        }
        totalQuantity.textContent = this.items.reduce((acc, item) => acc + item.quantity, 0);
        totalPrice.textContent = this.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
        this.items.forEach(item => {});
    }
}