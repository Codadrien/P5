//Popup
export function popUp(textPopUp, classPopUp) {
    const body = document.querySelector('body');
    const showPopup = document.createElement('p');
    showPopup.innerHTML = `<p>${textPopUp}</p>`;
    body.append(showPopup);
    showPopup.classList.add(`${classPopUp}`);
    setTimeout(() => {
        showPopup.remove(`${classPopUp}`)
    }, 4000);
};