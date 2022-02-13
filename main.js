import * as cons from './constants.js'
import {createElem} from "./newMatch/scoreBoard/scoreBoard.js";
import {getValue} from "./newMatch/newMatch.js";

export function setTitle() {
    let title = document.getElementById('title')
    title.textContent = cons.title
    title.className = 'topnav title element-center'
}
export function setCSS(){
    let head = document.getElementsByTagName('head')[0]

    let css = document.createElement('link')
    css.rel = 'stylesheet'
    css.type = 'text/css'
    css.href = './main.css'
    head.appendChild(css)

    let body = document.getElementById('menu-content')
    body.className = 'div-default'
}

function createElement(name, textContent,  ...classNames) {
    let elem = document.createElement(name)
    elem.textContent = textContent

    classNames.forEach( className => elem.className+= ' ' + className)
    return elem
}

export function setMenu(){
    let menu = document.getElementById('menu')
    menu.innerHTML = ''
    cons.menu.forEach( x => {
        let t = createElement('a', x)
        t.onclick = cons.menu_f[x]
        menu.appendChild(t)
    })
    menu.className = 'topnav content-center'
}

function addFontAwesome() {
    let head = document.getElementsByTagName('head')[0]
    let sc = createElem('script', head)
    sc.src = 'https://kit.fontawesome.com/a076d05399.js'
    sc.crossOrigin = 'anonymous'
}

setCSS()
setTitle()
setMenu()
addFontAwesome()
getValue()