export function getValue() {
    let menuContent = document.getElementById('menu-content')
    let div = document.createElement('div')
    div.innerText = 'Player Info'
    div.className += ' container'
    menuContent.innerHTML = ''
    menuContent.appendChild(div)
}