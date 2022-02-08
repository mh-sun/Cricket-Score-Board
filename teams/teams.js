import {createElem} from "../newMatch/scoreBoard/scoreBoard.js";
import {getRandColor} from "../newMatch/scoreBoard/Objects/GetRandom.js";
import {playersInTeam} from "./playersInTeam.js";

function getTeams(games) {
    let teams = []
    games.forEach(g=>{
        teams.push(g.innings[g.ci].battingTeam)
        teams.push(g.innings[g.ci].bowlingTeam)
    })
    return teams
}

function getMatches(t, games) {
    let sum = 0
    games.forEach(g=>{
        if(g.innings[0].battingTeam === t || g.innings[0].bowlingTeam === t)
            sum++
    })
    return sum
}

function editName(t) {
    document.getElementsByClassName('modal-bg')[0].classList.add('bg-active')
    let input = document.getElementById('newName')
    input.value = t.name
    input.tID = t.id
}

function deleteTeam(t, games) {
    games.forEach(g=>{
        if(g.innings[0].battingTeam === t){
            console.log('hello')
            g.innings[0].battingTeam = null
        }
        else if( g.innings[0].bowlingTeam === t){
            console.log('hello')
            g.innings[0].bowlingTeam = null
        }
    })
    for(let i = 0; i< games.length; i++){
        if(games[i].innings[0].battingTeam === null && games[i].innings[0].bowlingTeam === null){
            games.splice(i,1)
        }
    }
    localStorage.setItem('games', JSON.stringify(games))
    getValue()
}

function getSection(t, games) {
    let div = document.createElement('div')
    createElem('br',div)
    let tab = createElem('table', div)
    tab.classList.add('table-100')
    
    let row0 = createElem('tr', tab)
    let ico = createElem('td', row0)
    ico.rowSpan = '2'
    let button = document.createElement('button')
    ico.append(button)
    button.className = 'teamNameIco'
    button.style.cursor = 'pointer'
    button.innerText = t.name[0].toUpperCase()
    button.style.backgroundColor = getRandColor()
    button.onclick = ()=>{
        playersInTeam(t)
    }

    let name = createElem('td', row0)
    name.colSpan = '6'
    name.innerText = t.name
    name.style.fontsize = '20px'

    let edit = createElem('td', row0)
    edit.rowSpan = '2'
    let btn = createElem('i',edit)
    btn.className = 'fas fa-pen'
    btn.onclick = ()=>{
        editName(t)
    }

    let del = createElem('td', row0)
    del.rowSpan = '2'
    btn = createElem('i',del)
    btn.className = 'fas fa-trash'
    btn.onclick = ()=>{
        deleteTeam(t, games)
    }

    let row1 = createElem('tr', tab)
    let mName = createElem('td', row1)
    mName.innerText = 'Matches: '
    let mVal = createElem('td', row1)
    mVal.innerText = getMatches(t, games)
    let wName = createElem('td', row1)
    wName.innerText = 'Won: '
    let wVal = createElem('td', row1)
    wVal.innerText = 0
    let lName = createElem('td', row1)
    lName.innerText = 'Lost: '
    let lVal = createElem('td', row1)
    lVal.innerText = 0

    createElem('br',div)
    return div
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
    h4.innerText = 'Update Team Name'

    // let div = document.getElementsByClassName('modal')[0]
    // div.className += ' container element-center content-center'
    let input = document.createElement('input')
    input.type = 'text'
    input.id = 'newName'
    input.placeholder = 'Team Name'
    input.className += ' input element-center'
    div_i.appendChild(input)
    let ok = document.createElement('button')
    ok.innerText = 'OK'
    div_i.appendChild(ok)
    div_i.appendChild(document.createElement('br'))

    function updateTeam(id, name) {
        games.forEach(g=>{
            console.log(id)
            if(g.innings[0].battingTeam.id === id) g.innings[0].battingTeam.name = name
            if(g.innings[0].bowlingTeam.id === id) g.innings[0].bowlingTeam.name = name
            if(g.innings[1].battingTeam.id === id) g.innings[1].battingTeam.name = name
            if(g.innings[1].bowlingTeam.id === id) g.innings[1].bowlingTeam.name = name
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

function EmptyTeam() {
    let p = document.createElement('p')
    p.classList.add('empty')
    p.innerText = 'You don\'t have any team yet\nPlease Create teams'
    return p
}

function getValue() {
    let menuContent = document.getElementById('menu-content')
    menuContent.innerHTML = ''
    let games = JSON.parse(localStorage.getItem('games'))

    if(games == null){
        menuContent.append(EmptyTeam())
    }
    else {
        let teams = getTeams(games)
        teams.forEach(t=>{
            if(t != null)
                menuContent.append(getSection(t,games), document.createElement('br'))
        })
        menuContent.appendChild(getModal(games))
    }
}

export {getValue}