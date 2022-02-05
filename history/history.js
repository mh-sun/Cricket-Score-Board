import {createElem, createElemText} from "../newMatch/scoreBoard/scoreBoard.js";
import {getRandColor} from "../newMatch/scoreBoard/Objects/GetRandom.js";
import {getValue as scboard} from "../newMatch/scoreBoard/scoreBoard.js";
import {GameLS} from "../newMatch/scoreBoard/Objects/Game.js";

function deleteGame(t, games) {
    games.forEach(g=>{
        if(g.innings[0].battingTeam === t){
            g.innings[0].battingTeam = null
        }
        else if( g.innings[0].bowlingTeam === t){
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

function getRow(game, tBat, tBowl, tab, index) {
    let row0 = createElem('tr', tab)
    let ico = createElem('td', row0)
    let button = document.createElement('button')
    ico.append(button)
    button.className = 'teamNameIco'
    button.innerText = tBat.name[0].toUpperCase()
    button.style.backgroundColor = getRandColor()

    let name = createElem('td', row0)
    name.colSpan = '6'
    name.innerText = tBat.name
    name.style.fontsize = '20px'
    name.style.width = '60%'

    let score = createElem('td', row0)
    let run = createElem('span', score)
    run.innerText = tBat.getTotalRunsByBatsman() + game.innings[index].getExtras()
    createElemText('/', score)
    let wic = createElem('span', score)
    wic.innerText = tBowl.getWickets()

    let over = createElem('td', row0)
    createElemText('(', over)
    createElem('span', over).innerText = tBat.getOvers()
    createElemText(')', over)

    return row0
}

function getSection(game, games) {
    // console.log(document.getElementsByTagName('div')[0].classList)
    let div = document.createElement('div')
    createElem('br',div)
    let time = createElem('div', div)
    time.style.paddingLeft = '5%'
    time.appendChild(document.createTextNode(game.time))

    createElem('br',div)

    let tab = createElem('table', div)
    tab.classList.add('table-100')

    tab.appendChild(getRow(game, game.innings[0].battingTeam, game.innings[0].bowlingTeam, tab, 0))
    tab.appendChild(getRow(game, game.innings[1].battingTeam, game.innings[1].bowlingTeam, tab, 1))

    createElem('br',div)

    let preMatch = createElem('div', div)
    preMatch.style.paddingLeft = '5%'
    createElem('span', preMatch).innerText = game.tossWon
    createElemText(' Won the toss and opted to ', preMatch)
    createElem('span', preMatch).innerText = game.opt
    createElemText(' first', preMatch)

    createElem('br',div)

    tab = createElem('table', div)
    tab.style.textAlign = 'center'
    tab.classList.add('table-100')
    let row = createElem('tr', tab)

    let resume = createElem('td', row, 'button')
    resume.style.textAlign = 'center'
    resume.style.width = '30%'
    resume.innerText = 'Resume'
    resume.onclick = ()=>{
        scboard(game)
    }

    let scoreboard = createElem('td', row, 'button')
    scoreboard.style.textAlign = 'center'
    scoreboard.style.width = '30%'
    scoreboard.innerText = 'Scoreboard'

    let archive = createElem('td', row)
    let btn = createElem('i',archive, 'fas fa-archive')
    btn.classList.add('button')
    btn.onclick = ()=>{
        console.log('Archive')
    }
    let del = createElem('td', row)
    btn = createElem('i',del, 'fas fa-trash')
    btn.classList.add('button')
    btn.onclick = ()=>{
        deleteGame(game, games)
    }


    createElem('br',div)
    return div
}

function EmptyGeam() {
    let p = document.createElement('p')
    p.classList.add('empty')
    p.innerText = 'No Match History Found'
    return p
}

function getValue() {
    let menuContent = document.getElementById('menu-content')
    menuContent.innerHTML = ''
    let games = JSON.parse(localStorage.getItem('games'))
    if(games == null){
        menuContent.append(EmptyGeam())
    }else {
        games.forEach(g=>{
            if(g != null){
                let tempG = new GameLS(g)
                menuContent.append(getSection(tempG, games), document.createElement('br'))
            }

        })
    }

    // menuContent.appendChild(getModal(games))
}

export {getValue}