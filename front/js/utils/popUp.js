//Popup
export function popUp(textPopUp, classPopUp) {
    const body = document.querySelector('body');
    const showPopup = document.createElement('p');
    showPopup.textContent = textPopUp;
    body.append(showPopup);
    showPopup.classList.add(`${classPopUp}`);
    setTimeout(() => {
        showPopup.remove(`${classPopUp}`)
    }, 4000);
};