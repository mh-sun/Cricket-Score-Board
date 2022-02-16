import {createElement} from "../constants.js";

export function getModal(parent) {
    modalDestroy()
    let div = createElement('div', parent, 'modal-bg')
    let div_i = createElement('div', div, 'modal')
    return {div, div_i}
}
export function modalActive(modal, closeElement, func) {
    modal.classList.add('bg-active')
    closeElement.addEventListener('click', func)
}
export function modalInactive(modal) {
    modal.classList.remove('bg-active')
}
export function modalDestroy() {
    let modals = document.getElementsByClassName('modal-bg')
    if(modals === null || modals === undefined) return
    modals.forEach(m=>m.remove())
}