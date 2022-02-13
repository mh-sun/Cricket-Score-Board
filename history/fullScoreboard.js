import {createElem, createElemText} from "../newMatch/scoreBoard/scoreBoard.js";
import {setMenu} from "../main.js";
import {getValue} from "./history.js";

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

    return div
}

function fullScoreboard(game) {
    let menuContent = document.getElementById('menu-content')
    menuContent.innerHTML = ''
    menuContent.append(preMatch(game), document.createElement('br'))

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

function getName(wholeOver) {
    let bowler
    let batsmans = []

    wholeOver.forEach(s=>{
        bowler = s.bowler
        if(batsmans.indexOf(s.striker) === -1) batsmans.push(s.striker)
    })

    let str = bowler + ' to '
    for(let i =0; i< batsmans.length; i++){
        str += batsmans[i]
        if(i !== batsmans.length-1) str += ' & '
    }
    return str
}

function getTotalRuns(wholeOver) {
    let runs = 0
    wholeOver.forEach(s=>{
        if(s.extras[0] === 'NB' || s.extras[0] === 'WD') runs += (s.run + 1)
        else runs += s.run
    })
    return runs
}

function getRunInfo(state) {
    let span = document.createElement('span')
    span.style.display = 'flex'
    span.style.flexDirection = 'column'
    span.style.fontSize = '10px'
    span.style.textAlign = 'center'

    let btn = document.createElement('button')
    span.append(btn)
    btn.classList.add('make-round')
    btn.innerText = state.run

    let s = document.createElement('span')
    span.append(s)
    if(state.extras[0] === 'WD' ||state.extras[0] === 'NB' ||state.extras[0] === 'B' ||state.extras[0] === 'LB'){
        btn.className += ' color-orange'
        s.innerText += state.extras[0]
    }
    else if(state.extras[0] === 'W'){
        btn.className += ' color-red'
        s.innerText = "OUT"
    }
    else if(state.run === 4){
        btn.className += ' color-green'
    }
    else if(state.run === 6){
        btn.className += ' color-light-green'
    }
    return span
}

function getEachOver(wholeOver, over) {
    let tab = document.createElement('table')
    tab.classList.add('table-100')
    tab.style.paddingLeft = '1%'
    tab.id = 'overTab'
    let row1 = document.createElement('tr')
    tab.append(row1)

    let overNo = document.createElement('td')
    row1.append(overNo)
    overNo.innerText = 'Ov ' + over

    let bowlerToBatsman = document.createElement('td')
    row1.append(bowlerToBatsman)
    bowlerToBatsman.style.width = '80%'
    bowlerToBatsman.innerText = getName(wholeOver)

    let row2 = document.createElement('tr')
    tab.append(row2)

    let totalRun = document.createElement('td')
    row2.append(totalRun)
    totalRun.innerText = getTotalRuns(wholeOver) + ' Runs'

    let overDetails = document.createElement('td')
    overDetails.style.display = 'flex'
    overDetails.style.flexDirection = 'row'
    row2.append(overDetails)
    wholeOver.forEach(s=>{
        overDetails.append(getRunInfo(s))
    })

    return tab
}

function getInninsOver(innings) {
    let divO = document.createElement('div')
    let over = 1
    let c = 0
    let wholeOver = []
    for(let i = 0; i< innings.states.length; i++){
        if (innings.states[i].extras[0] === 'N') c++
        wholeOver.push(innings.states[i])
        if (c >= 6){
            divO.append(getEachOver(wholeOver, over))
            over++
            c = 0
            wholeOver = []
        }
        if(i===innings.states.length-1 && wholeOver.length !== 0){
            divO.append(getEachOver(wholeOver, over))
            over++
            c = 0
            wholeOver = []
        }
    }
    return divO
}

function fullOvers(game) {
    let menuContent = document.getElementById('menu-content')
    menuContent.innerHTML = ''
    game.innings.forEach(inn=>{
        menuContent.append(getInninsOver(inn))
    })
}
