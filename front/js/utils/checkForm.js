// regex du formulaire
export function checkForm() {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const email = document.getElementById("email");
    let checkFormValue = true;
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    if (firstName.value) {
        if (!firstName.value.match(/^[a-z-|à-ü]+$/i)) {
            firstNameErrorMsg.textContent = "Le prénom doit seulement contenir des lettres sans espace";
            checkFormValue = false;
        } else {
            firstNameErrorMsg.textContent = "";
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
        }
    } else {
        checkFormValue = false;
    }
    return checkFormValue;
}