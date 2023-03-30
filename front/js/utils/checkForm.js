function checkForm() {
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    if (firstName.value) {
        if (!firstName.value.match(/^[a-z-|à-ü]+$/i)) {
            firstNameErrorMsg.textContent = "Le prénom doit seulement contenir des lettres sans espace";
            checkFormValue = false;
        } else {
            firstNameErrorMsg.textContent = "";
            checkFormValue = true;
        }
    } else {
        checkFormValue = false;
    }
    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    if (lastName.value) {
        if (!lastName.value.match(/^[a-z-|à-ü]+$/i)) {
            lastNameErrorMsg.textContent = "Le nom doit seulement contenir des lettres sans espace";
            checkFormValue = false;
        } else {
            lastNameErrorMsg.textContent = "";
            checkFormValue = true;
        }
    } else {
        checkFormValue = false;
    }
    const addressErrorMsg = document.getElementById("addressErrorMsg");
    if (address.value) {
        if (!address.value.match(/^[a-z- |à-ü|0-9]+$/i)) {
            addressErrorMsg.textContent = "L'adresse doit seulement contenir des lettres et des chiffres";
            checkFormValue = false;
        } else {
            addressErrorMsg.textContent = "";
            checkFormValue = true;
        }
    } else {
        checkFormValue = false;
    }
    const cityErrorMsg = document.getElementById("cityErrorMsg");
    if (city.value) {
        if (!city.value.match(/^[a-z- |à-ü]+$/i)) {
            cityErrorMsg.textContent = "La ville doit seulement contenir des lettres";
            checkFormValue = false;
        } else {
            cityErrorMsg.textContent = "";
            checkFormValue = true;
        }
    } else {
        checkFormValue = false;
    }

    const emailErrorMsg = document.getElementById("emailErrorMsg");
    if (email.value) {
        if (!email.value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
            emailErrorMsg.textContent = "Adresse mail invalide";
            checkFormValue = false;
        } else {
            emailErrorMsg.textContent = "";
            checkFormValue = true;
        }
    } else {
        checkFormValue = false;
    }
}

function orderListener() {
    order.addEventListener("click", (e) => {
        e.preventDefault();
        if (checkFormValue == true) {
            const contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            };
            let products = [];
            cartLocalStorage.forEach(product => products.push(product.id));

            fetch("http://localhost:3000/api/products/order", {
                    method: 'POST',
                    body: JSON.stringify({
                        contact,
                        products,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(data => window.location.assign("confirmation.html" + "?id=" +
                    data.orderId));
            localStorage.clear();

        } else {
            alert("Formulaire invalide");
            return;
        }
    });
}