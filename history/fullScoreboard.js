import {createElem, createElemText} from "../newMatch/scoreBoard/scoreBoard.js";
import {setMenu} from "../main.js";
import {getValue} from "../newMatch/newMatch.js";

let batsmanTable = ['Batsman', 'R', 'B', '4s', '6s', 'SR']
let bowlerTable = ['Bowler', 'O', 'M', 'R', 'W', 'ER']
let IOneDetails = true
let ITwoDetails = true

function createElement(name, textContent,  ...classNames) {
    let elem = document.createElement(name)
    elem.textContent = textContent

    classNames.forEach( className => elem.className+= ' ' + className)
    return elem
}

export function setMenuSC(game){
    let menu = document.getElementById('menu')
    menu.innerHTML = ''

    let btn = createElem('i',menu, 'fas fa-arrow-left', 'button', 'far-left')
    btn.style.color = 'white'
    btn.style.top = '15px'
    btn.onclick = ()=>{
        setMenu()
        getValue()
    }

    let t = createElement('a', 'Scoreboard')
    t.onclick = function (){
        fullScoreboard(game)
    }
    menu.appendChild(t)

    t = createElement('a', 'Overs')
    t.onclick = ()=>{fullOvers(game)}
    menu.appendChild(t)
    menu.className = 'topnav content-center'

    fullScoreboard(game)
}

function preMatch(game) {
    let preMatch = document.createElement('div')
    preMatch.style.textAlign = 'center'
    preMatch.style.padding = '1%'
    createElem('span', preMatch).innerText = game.tossWon
    createElemText(' Won the toss and opted to ', preMatch)
    createElem('span', preMatch).innerText = game.opt
    createElemText(' first', preMatch)
    return preMatch
}

function shortView(innings) {
    let divO = document.createElement('div')
    divO.classList.add('fscboard', 'side-pad')
    let tab = createElem('table', divO)
    tab.style.width = '100%'
    let row = createElem('tr', tab)
    let name = createElem('td',row)
    name.style.textAlign = 'left'
    name.innerText = innings.battingTeam.name

    createElem('td',row).style.width = '80%'

    let score = createElem('td',row)
    score.style.textAlign = 'right'
    score.innerText = innings.battingTeam.getTotalRunsByBatsman() + innings.getExtras()
        + '-' + innings.bowlingTeam.getWickets()
        + '(' + innings.battingTeam.getOvers() + ')'
    return divO
}

function getBatTh() {
    let tr = document.createElement('tr')
    batsmanTable.forEach(elem =>{
        let th = document.createElement('th')
        th.innerText = elem
        if(elem === batsmanTable[0]) th.className += ' tableName'
        tr.appendChild(th)
    })
    return tr
}

function getBowlTh() {
    let tr = document.createElement('tr')
    bowlerTable.forEach(elem =>{
        let th = document.createElement('th')
        th.innerText = elem
        if(elem === bowlerTable[0]) th.className += ' tableName'
        tr.appendChild(th)
    })
    return tr
}

function getCol(runs, ...className) {
    let td = document.createElement('td')
    className.forEach(classes => {
        td.className+=' '+classes
    })
    td.innerText = runs
    return td
}

function getBowlerValues(player) {
    let tr = document.createElement('tr')
    tr.appendChild(getCol(player.name))
    tr.appendChild(getCol(player.bowlingRole.getOver()))
    tr.appendChild(getCol(player.bowlingRole.maidens))
    tr.appendChild(getCol(player.bowlingRole.runs))
    tr.appendChild(getCol(player.bowlingRole.wickets))
    tr.appendChild(getCol(player.bowlingRole.getEconomy()))
    return tr
}

function getBatsmanValues(player) {
    let tr = document.createElement('tr')
    tr.appendChild(getCol(player.name))
    tr.appendChild(getCol(player.battingRole.runs))
    tr.appendChild(getCol(player.battingRole.balls))
    tr.appendChild(getCol(player.battingRole.fours))
    tr.appendChild(getCol(player.battingRole.sixes))
    tr.appendChild(getCol(player.battingRole.getStrikeRate()))
    return tr
}

function playerDetails(innings, name) {
    let div = document.createElement('div')
    div.id = name
    div.className += ' side-pad tb-pad'
    let tab = document.createElement('table')
    tab.id = 'batTable'


    let temp = 0
    innings.battingTeam.players.forEach(p=>{
        if(p.isBatsman(innings)) temp++
    })
    if(temp !== 0) {
        tab.appendChild(getBatTh())
        innings.battingTeam.players.forEach(p=>{
            if(p.isBatsman(innings))
            {
                tab.append(getBatsmanValues(p))
            }
        })
        div.append(tab)
        createElem('hr', div)
        let tabi = createElem('table', div)
        let row = createElem('tr',tabi)
        let extra = createElem('td', row)
        extra.innerText = 'Extras'
        extra = createElem('td', row)
        extra.style.textAlign = 'right'
        extra.innerText = innings.getExtras()
            + '\t' + innings.extra.bye+ ' B, '
            +innings.extra.legBye + ' LB, '
            +innings.extra.wide + ' WD, '
            +innings.extra.noBall + ' NB, '
            +innings.extra.penalty + ' P'
        createElem('hr', div)
    }

    temp = 0
    innings.bowlingTeam.players.forEach(p=>{
        if(p.isBowler(innings)) temp++
    })
    if(temp !== 0) {
        tab = createElem('table', div)
        tab.appendChild(getBowlTh())
        innings.bowlingTeam.players.forEach(p=>{
            if(p.isBowler(innings)){
                tab.append(getBowlerValues(p))
            }
        })
    }
    // div.append(tab)

    return div
}

function fullScoreboard(game) {
    let menuContent = document.getElementById('menu-content')
    menuContent.innerHTML = ''
    menuContent.appendChild(preMatch(game))

    let IOne = shortView(game.innings[0])
    menuContent.append(IOne)
    IOne.onclick = function (){
        document.getElementById('i1').hidden = IOneDetails
        IOneDetails = !IOneDetails
    }
    menuContent.append(playerDetails(game.innings[0], 'i1'), document.createElement('br'))

    let ITwo = shortView(game.innings[1])
    menuContent.append(ITwo)
    ITwo.onclick = function (){
        document.getElementById('i2').hidden = ITwoDetails
        ITwoDetails = !ITwoDetails
    }
    menuContent.append(playerDetails(game.innings[1], 'i2'), document.createElement('br'))

}

function fullOvers(game) {

}
