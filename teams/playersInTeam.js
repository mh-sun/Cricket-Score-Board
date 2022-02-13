import {createElem} from "../newMatch/scoreBoard/scoreBoard.js";
import {getRandColor} from "../Objects/GetRandom.js";
import {getValue} from "./teams.js";
import {playerProfile} from "./playerProfile.js";

function chnageName(g, id, name, i) {
    g.innings[i].battingTeam.players.forEach(p=>{
        if(p.id === id) p.name = name
    })
    g.innings[i].bowlingTeam.players.forEach(p=>{
        if(p.id === id) p.name = name
    })
}

function getModal(games) {
    let div = document.createElement('div')
    div.classList.add('modal-bg')


    let div_i = document.createElement('div')
    div_i.classList.add('modal')
    div_i.classList.add('flex-row')

    div.appendChild(div_i)

    let h4 = document.createElement('h4')
    div_i.appendChild(h4)
    h4.innerText = 'Update Player Name'

    // let div = document.getElementsByClassName('modal')[0]
    // div.className += ' container element-center content-center'
    let input = document.createElement('input')
    input.type = 'text'
    input.id = 'newName'
    input.placeholder = 'Player Name'
    input.className += ' input element-center'
    div_i.appendChild(input)
    let ok = document.createElement('button')
    ok.innerText = 'OK'
    div_i.appendChild(ok)
    div_i.appendChild(document.createElement('br'))

    function updateTeam(id, name) {
        games.forEach(g=>{
            console.log(id)
            chnageName(g, id, name, 0)
            chnageName(g, id, name, 1)
        })
        localStorage.setItem('games', JSON.stringify(games))
    }

    ok.addEventListener('click',function () {
        let input = document.getElementById('newName')
        // console.log(input)
        let id = input.tID
        let name = input.value
        updateTeam(id, name)
        input.remove()
        div.classList.remove('bg-active')
        getValue()
    })

    return div
}

function editName(t) {
    document.getElementsByClassName('modal-bg')[0].classList.add('bg-active')
    let input = document.getElementById('newName')
    input.value = t.name
    input.tID = t.id
}

function EmptyTeam() {
    let p = document.createElement('p')
    p.classList.add('empty')
    p.innerText = 'You don\'t have any player yet\nPlease add player.'
    return p
}

function getSection(player, team) {
    let div = document.createElement('div')
    createElem('br',div)
    let tab = createElem('table', div)
    tab.classList.add('table-100')
    tab.id = 'playerTab'

    let row0 = createElem('tr', tab)
    let ico = createElem('td', row0)
    let button = document.createElement('button')
    ico.append(button)
    button.className = 'teamNameIco'
    button.style.cursor = 'pointer'
    button.innerText = player.name[0].toUpperCase()
    button.style.backgroundColor = getRandColor()
    button.onclick = ()=>{
        playerProfile(player, team)
    }

    let name = createElem('td', row0)
    name.innerText = player.name
    name.style.fontsize = '20px'
    name.style.width = '50%'

    let edit = createElem('td', row0)
    let btn = createElem('i',edit)
    btn.className = 'fas fa-pen'
    btn.onclick = ()=>{
        editName(player)
    }

    let del = createElem('td', row0)
    btn = createElem('i',del)
    btn.className = 'fas fa-trash'
    btn.onclick = ()=>{
        // deleteTeam(t, games)
    }

    let menu = createElem('td', row0)
    btn = createElem('i',menu)
    btn.className = 'fas fa-bars'
    btn.onclick = ()=>{
        // deleteTeam(t, games)
    }

    createElem('br',div)
    return div
}

export function playersInTeam(team){
    let menuContent = document.getElementById('menu-content')
    menuContent.innerHTML = ''
    let games = JSON.parse(localStorage.getItem('games'))

    if(games == null){
        menuContent.append(EmptyTeam())
    }
    else {
        team.players.forEach(p=>{
            if(p != null)
                menuContent.append(getSection(p,team), document.createElement('br'))
        })
        menuContent.appendChild(getModal(games))
    }
}