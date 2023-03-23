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

    removeItem(item) {
        // fonction to remove an item from cart
    }

    getTotalValue() {
        // fonction to calculate the total value of the cart
    }

}