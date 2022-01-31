import * as player from './Objects/Player.js'
import * as team from './Objects/Team.js'
import * as constants from "../../constants.js";
import * as cals from './Calc.js'
import {retirePlayer} from "./retirePlayer.js";
import {addNewBowler} from "./newBowler.js";
import {getExtraRun, getModal, getPartnership, undo} from "./addManagement.js";
import {bowlingTeam, game} from "./Calc.js";

let batsmanTable = ['Batsman', 'R', 'B', '4s', '6s', 'SR']
let bowlerTable = ['Bowler', 'O', 'M', 'R', 'W', 'ER']
export let extras = ['Wide', 'No-Ball', 'Byes', 'Leg-Byes', 'Wicket']
let runs = ['0','1', '2', '3', '4', '5', '6', '...']

function setCSS() {
    let head = document.getElementsByTagName('head')[0]

    let css = document.createElement('link')
    css.rel = 'stylesheet'
    css.type = 'text/css'
    css.href = '../../../css/scoreBoard.css'
    head.appendChild(css)
}

function createSpanById(id, par) {
    let t  = document.createElement('span')
    t.id = id
    par.appendChild(t)
    return t
}

function createSpanByClass(className, par) {
    let span  = document.createElement('span')
    span.className = className
    par.appendChild(span)
    return span
}

export function createElem(h, div, ...className) {
    let t = document.createElement(h)
    className.forEach(classes => {
        t.className+=' '+classes
    })
    div.appendChild(t)
    return t
}

export function createElemText(h, div) {
    let t = document.createTextNode(h)
    div.appendChild(t)
}

function getShortMatchView() {
    let div = document.createElement('div')
    let h3 = createElem('h3',div)
    createElemText('Batting : ', h3)
    let span = createSpanById('battingTeam', h3)
    span.innerText = cals.battingTeam.name + ' vs '

    span = createSpanById('bowlingTeam', h3)
    span.innerText = cals.bowlingTeam.name
    span = createSpanByClass('font-40', div)
    span.className += ' left-pad'
    let span_i = createSpanById('total_run', span)
    span_i.innerText = cals.battingTeam.getTotalRunsByBatsman() + game.innings[game.currentInnings].getExtras()
    createElemText(' - ', span)
    span_i = createSpanById('total_wicket', span)
    span_i.innerText = bowlingTeam.getWickets()
    span = createSpanByClass('font-20', div)
    createElemText('(', span)
    span_i = createSpanById("runningOver", span)
    createElemText(')', span)
    span_i.innerText = cals.battingTeam.getOvers()
    span = createSpanByClass('span-far-right', div)
    createElemText('CRR : ', span)
    span_i = createSpanById('runrate', span)
    span_i.innerText = cals.battingTeam.getCRR().toPrecision(2)

    return div
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

function getScoreOverView() {
    let div = document.createElement('div')
    div.className += ' side-pad tb-pad'
    let tab = document.createElement('table')
    tab.id = 'batTable'
    tab.appendChild(getBatTh())
    cals.battingTeam.players.forEach(player=>{
        let tr = getBatsmanValues(player)

        if (player === cals.onStrike){
            tr.className  = 'on-strike'
            tr.children[0].innerHTML += '*'
        }
        else tr.className = ''

        tab.append(tr)
    })
    tab.appendChild(getBowlTh())
    cals.bowlingTeam.players.forEach(player=>{
        tab.append(getBowlerValues(player))
    })
    div.append(tab)

    return div
}

function getBRElem() {
    return document.createElement('br')
}

function getOverDetails() {
    let div = document.createElement('div')
    div.className += ' tb-pad'
    let span = createSpanByClass('left-pad', div)
    span.innerText = 'This Over : '
    span = createSpanByClass(' col-gap', div)
    span.className += ' tb-pad side-pad'
    cals.bowler.bowlingRole.overs_details.forEach(eachBall=>{
        let btn = createElem('button', span, 'make-round')
        btn.textContent = eachBall[0]+'\n'
        if(eachBall[1] === 'WD' ||eachBall[1] === 'NB' ||eachBall[1] === 'B' ||eachBall[1] === 'LB'){
            btn.className += ' color-orange'
            btn.innerText += eachBall[1]
        }
        else if(eachBall[1] === 'W'){
            btn.className += ' color-red'
            btn.innerText = "OUT"
        }
        else if(eachBall[0] == 4){
            btn.className += ' color-green'
        }
        else if(eachBall[0] == 6){
            btn.className += ' color-light-green'
        }

    })
    return div
}

function getExtras() {
    let div = document.createElement('div')
    div.className += ' side-pad tb-pad'
    let div_i = createElem('div', div, 'content-center')
    extras.forEach(extra=>{
        let div_nestedI = createElem('div', div_i)
        let inp = createElem('input', div_nestedI)
        inp.type = 'checkbox'
        inp.value = extra
        inp.id = extra
        let label = createElem('label', div_nestedI)
        label.innerText = extra
    })
    createElem('br',div)
    createElem('br',div)
    div_i = createElem('div', div, 'content-center')
    let retire = createElem('button',div_i, 'btn')
    retire.innerText = 'Retire'
    retire.onclick = retirePlayer
    let swapBatsman = createElem('button',div_i, 'btn')
    swapBatsman.innerText = 'Swap Batsman'
    swapBatsman.onclick = cals.swapBatsman
    return div
}

function getButtons() {
    let div = document.createElement('div')
    div.className += ' row-content side-pad tb-pad content-center div-right'
    let div_i = createElem('div', div, 'content-center')
    for(let i = 0; i< 4; i++){
        let run = runs[i]
        let btn = createElem('button',div_i, 'runs')
        btn.onclick = cals.run[run]
        btn.innerText = run
    }
    div_i = createElem('div', div, 'content-center')
    for(let i = 4; i< runs.length; i++){
        let run = runs[i]
        let btn = createElem('button',div_i, 'runs')
        btn.onclick = cals.run[run]
        btn.innerText = run
    }


    return div
}

function getAdditionals() {
    let div = document.createElement('div')
    div.className += ' side-pad tb-pad div-left content-center'
    let Undo = createElem('button',div, 'btn')
    Undo.innerText = 'Undo'
    Undo.onclick = undo
    let partnership = createElem('button',div, 'btn')
    partnership.innerText = 'Partnerships'
    partnership.onclick = getPartnership
    let Extras = createElem('button',div, 'btn')
    Extras.innerText = 'Extras'
    Extras.onclick = getExtraRun
    return div
}

export function updateScoreBoard() {
    const body = document.getElementById('menu-content')
    body.innerHTML = ''
    body.className = 'div-default'
    body.append(getShortMatchView(), getBRElem())
    body.append(getScoreOverView(), getBRElem())
    body.append(getOverDetails(), getBRElem())
    body.append(getExtras(), getBRElem())
    body.append(getAdditionals())
    body.append(getButtons(), getBRElem())
    body.append(getModal())
}

export function getValue(game) {
    setCSS()
    cals.initScoreBoard()
    updateScoreBoard()
}
