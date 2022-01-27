import {createElemText} from "./scoreBoard.js";

function init(div) {
    let d = document.createElement('div')
    createElemText('Select player to retire :', d)
    d.className += ' tb-pad'
}

export function addNewBowler() {
    let div = document.getElementById('menu-content')
    div.innerHTML = ''
    div.className = 'pad-20'
    init(div)
}