import {createElem} from "../newMatch/scoreBoard/scoreBoard.js";
import {getRandColor} from "../Objects/GetRandom.js";
import {playersInTeam} from "./playersInTeam.js";
import {Team} from "../Objects/Team.js";
import {getGames, getTeamsFromLS, setGamesToLS, setTeamsToLS} from "../Objects/LSUtils.js";
import {createElement} from "../constants.js";

function getMatches(t, games) {
    let sum = 0
    games.forEach(g=>{
        if(g.innings[0].battingTeam.name === t.name || g.innings[0].bowlingTeam.name === t.name)
            sum++
    })
    return sum
}

function editName(t) {
    document.getElementsByClassName('modal-bg')[0].classList.add('bg-active')
    let input = document.getElementById('newName')
    input.value = t.name
    input.oldName = t.name
}

function deleteTeam(t) {
    let games = getGames()
    games.forEach(g=>{
        if(g.innings[0].battingTeam.name === t.name){
            g.innings[0].battingTeam = null
        }
        else if( g.innings[0].bowlingTeam.name === t.name){
            g.innings[0].bowlingTeam = null
        }
    })
    for(let i = 0; i< games.length; i++){
        if(games[i].innings[0].battingTeam === null && games[i].innings[0].bowlingTeam === null){
            games.splice(i,1)
        }
    }
    setGamesToLS(games)

    let teams = getTeamsFromLS()
    teams = teams.map(team=>team.name === t.name? t : team)
    setTeamsToLS(teams)
    getValue()
}

function getWin(team, games) {
    let sum = 0
    games.forEach(g=>{
        if(g.result.winner === team.name) sum++
    })
    return sum
}

function getLose(team, games) {
    let sum = 0
    games.forEach(g=>{
        if(g.result.loser === team.name) sum++
    })
    return sum
}

function getSection(t) {
    let div = document.createElement('div')
    createElem('br',div)
    let tab = createElem('table', div)
    tab.id = 'teamTab'
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
        deleteTeam(t)
    }

    let games = getGames()
    let row1 = createElem('tr', tab)
    let mName = createElem('td', row1)
    mName.innerText = 'Matches: '
    let mVal = createElem('td', row1)
    mVal.innerText = getMatches(t, games)
    let wName = createElem('td', row1)
    wName.innerText = 'Won: '
    let wVal = createElem('td', row1)
    wVal.innerText = getWin(t, games)
    let lName = createElem('td', row1)
    lName.innerText = 'Lost: '
    let lVal = createElem('td', row1)
    lVal.innerText = getLose(t, games)

    createElem('br',div)
    return div
}

function getModal() {
    let div = document.createElement('div')
    div.classList.add('modal-bg')

    let div_i = document.createElement('div')
    div_i.classList.add('modal')
    div_i.classList.add('flex-row')

    div.appendChild(div_i)

    let h4 = document.createElement('h4')
    div_i.appendChild(h4)
    h4.innerText = 'Update Team Name'

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

    function updateTeam(oName, name) {
        let games = getGames()
        games.forEach(g=>{
            if(g.innings[0].battingTeam.name === oName) g.innings[0].battingTeam.name = name
            if(g.innings[0].bowlingTeam.name === oName) g.innings[0].bowlingTeam.name = name
            if(g.innings[1].battingTeam.name === oName) g.innings[1].battingTeam.name = name
            if(g.innings[1].bowlingTeam.name === oName) g.innings[1].bowlingTeam.name = name
        })
        setGamesToLS(games)

        let teams = getTeamsFromLS()
        teams = teams.map(team=>{
            if(team.name === oName) team.name = name
            return team
        })
        setTeamsToLS(teams)
    }

    ok.addEventListener('click',function () {
        let input = document.getElementById('newName')
        let oldName = input.oldName
        let name = input.value
        if(name !== oldName && name !== '')
            updateTeam(oldName, name)
        // input.remove()
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

export function getFloatingButton(className) {
    let button = document.createElement("Button");
    let i = createElement('i', button)
    i.className = className
    i.style = 'color:white;font-size:20px'
    button.style = "bottom:3%;right:3%;position:fixed;border-radius: 100%;background-color: green;display:flex;justify-content: center;align-items: center;height:50px;width:50px;border:0"
    return button
}

function createTeam(name) {
    let teams = getTeamsFromLS(), flag = false
    teams.forEach(t=>{
        if(t.name === name) flag = true
    })
    if (!flag) teams.push(new Team(name))
    setTeamsToLS(teams)
    return true
}

function addTeam() {
    let div = document.getElementsByClassName('modal-bg')[0]
    div.classList.add('bg-active')
    let div_i = document.getElementsByClassName('modal')[0]
    div_i.innerHTML = ''

    let h4 = document.createElement('h4')
    h4.innerText = 'Create Team'
    div_i.appendChild(h4)

    let input = document.createElement('input')
    input.type = 'text'
    input.id = 'name'
    input.placeholder = 'Enter Team Name'
    input.className += ' input element-center'
    div_i.appendChild(input)

    let submit = document.createElement('input')
    submit.type = 'button'
    submit.value = 'OK'
    submit.className += ' element-center submit-form'
    div_i.appendChild(submit)
    div_i.appendChild(document.createElement('br'))
    submit.addEventListener('click',function () {
        if(input.value !== '')
            createTeam(input.value)
        div.classList.remove('bg-active')
        getValue()
    })

}

function getValue() {
    let menuContent = document.getElementById('menu-content')
    menuContent.innerHTML = ''
    let teams = getTeamsFromLS()
    if(teams.length === 0){
        menuContent.append(EmptyTeam())
    }
    else {
        teams.forEach(t=>{
            menuContent.append(getSection(t), document.createElement('br'))
        })
    }
    menuContent.appendChild(getModal())

    let addButton = getFloatingButton('fas fa-plus')
    menuContent.appendChild(addButton)
    addButton.onclick = function () {
        addTeam()
    }
}

export {getValue}