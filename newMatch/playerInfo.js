function getStriker() {
    let div = document.createElement('div')

}

export function getValue() {
    let body  = document.getElementById('menu-content')
    body.innerHTML = ''
    let div = document.createElement('div')
    div.className += ' container'
    body.appendChild(getStriker())
}