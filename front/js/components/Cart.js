export default class Cart {

    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }

    // recupère le local storage
    getItems() {
        return this.items;
    }

    // ajoute le produit dans le localStorage
    addItem(selectedProduct) {
        // sameIdAndColor est un objet du local storage qui est égale au produit sélectionné
        const sameIdAndColor = this.items.find(item => item.id === selectedProduct.id && item.color === selectedProduct.color);
        // vérifie si le produit existe, si oui, ajoute la quantité sinon ajoute tout le produit
        if (sameIdAndColor) {
            sameIdAndColor.quantity += selectedProduct.quantity;
        } else {
            this.items.push(selectedProduct);
        }
        localStorage.setItem("cart", JSON.stringify(this.items));
    }

    // mets à jour la quantité dans le localStorage
    quantityListener(dataId, datacolor, inputQuantityValue) {
        let index = this.items.findIndex(item => item.id === dataId && item.color === datacolor);
        this.items[index].quantity = inputQuantityValue;
        localStorage.setItem("cart", JSON.stringify(this.items));
    }

    // supprime un élément dans le localStorage
    deleteProducts(dataId, datacolor) {
        let index = this.items.findIndex(item => item.id === dataId && item.color === datacolor);
        this.items.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(this.items));
    }

    // récuperer le prix du produit depuis l'api
    addPriceToItems(products) {
        this.items.forEach(item => {
            item.price = products.find(item => item.id === products._id).price;
        })
    }

    // calcul la valeur total
    getTotalValue() {
        for (let i = 0; i < this.items.length; i++) {
            if (!this.items[i].price) {
                return -1;
            }
        }
        totalQuantity.textContent = this.items.reduce((acc, item) => acc + item.quantity, 0);
        totalPrice.textContent = this.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    }
}