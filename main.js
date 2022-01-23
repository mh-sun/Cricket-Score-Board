import * as cons from './constants.js'

function setTitle() {
    let title = document.getElementById('title')
    title.textContent = cons.title
    title.className = 'topnav title element-center'
    //
    // let br = document.createElement('br')
    // title.parentNode.insertBefore(br, title.nextSibling)

}
function setHead(){
    let head = document.getElementsByTagName('head')[0]

    let css = document.createElement('link')
    css.rel = 'stylesheet'
    css.type = 'text/css'
    css.href = 'main.css'
    head.appendChild(css)
}

function createElement(name, textContent,  ...classNames) {
    let elem = document.createElement(name)
    elem.textContent = textContent

    classNames.forEach( className => elem.className+= ' ' + className)
    return elem
}

function setMenu(){
    let menu = document.getElementById('menu')
    cons.menu.forEach( x => {
        let t = createElement('a', x)
        t.onclick = cons.menu_f[x]
        menu.appendChild(t)
    })
    menu.className += ' topnav content-center'
}

setHead()
setTitle()
setMenu()