function getValue() {
    let menuContent = document.getElementById('menu-content')
    let div = document.createElement('div')
    div.innerText = 'History menu is clicked'
    div.className += ' container'

    menuContent.innerHTML = ''

    menuContent.appendChild(div)
}

export {getValue}