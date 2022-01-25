import * as player from './Objects/Player.js'
import * as team from './Objects/Team.js'
import * as constants from "../../constants.js";
import * as cals from './Calc.js'
import {run} from "./Calc.js";

let batsmanTable = ['Batsman', 'R', 'B', '4s', '6s', 'SR']
let bowlerTable = ['Bowler', 'O', 'M', 'R', 'W', 'ER']
let extras = ['Wide', 'No-Ball', 'Byes', 'Leg-Byes', 'Wicket']
let runs = ['0','1', '2', '3', '4', '5', '6']

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

function createElem(h, div, ...className) {
    let t = document.createElement(h)
    className.forEach(classes => {
        t.className+=' '+classes
    })
    div.appendChild(t)
    return t
}

function createElemText(h, div) {
    let t = document.createTextNode(h)
    div.appendChild(t)
}

function getShortMatchView() {
    let div = document.createElement('div')
    let h3 = createElem('h3',div)
    createElemText('Batting : ', h3)
    let span = createSpanById('battingTeam', h3)
    span.innerText = cals.battingTeam.name
    span = createSpanByClass('font-40', div)
    span.className += ' left-pad'
    let span_i = createSpanById('total_run', span)
    span_i.innerText = cals.battingTeam.getTotalRunsByBatsman()
    createElemText(' - ', span)
    span_i = createSpanById('total_wicket', span)
    span_i.innerText = '0'
    span = createSpanByClass('font-20', div)
    createElemText('(', span)
    span_i = createSpanById("runningOver", span)
    createElemText(')', span)
    span_i.innerText = cals.battingTeam.getOvers()
    span = createSpanByClass('span-far-right', div)
    createElemText('CRR : ', span)
    span_i = createSpanById('runrate', span)
    span_i.innerText = cals.battingTeam.getCRR().toPrecision(2)
    // createElemText('0.0', span_i)


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
    tr.appendChild(getCol(player.name, 'tableName'))
    tr.appendChild(getCol(player.bowlingRole.balls))
    tr.appendChild(getCol(player.bowlingRole.maidens))
    tr.appendChild(getCol(player.bowlingRole.runs))
    tr.appendChild(getCol(player.bowlingRole.wickets))
    tr.appendChild(getCol(player.bowlingRole.getEconomy()))
    return tr
}

function getBatsmanValues(player) {
    let tr = document.createElement('tr')

    tr.appendChild(getCol(player.name, 'tableName'))
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
    let btn = createElem('button', div, 'make-round')
    btn.innerText = 1
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
    createElem('button',div_i, 'btn').innerText = 'Retire'
    createElem('button',div_i, 'btn').innerText = 'Swap Batsman'
    return div
}

function getButtons() {
    let div = document.createElement('div')
    div.className += ' side-pad tb-pad content-center'
    runs.forEach(run=>{
        let btn = createElem('button',div, 'runs')
        btn.onclick = cals.run[run]
        btn.innerText = run
    })

    return div
}

export function getValue() {
    setCSS()
    const body = document.getElementById('menu-content')
    body.innerHTML = ''
    body.className = 'div-default'
    body.append(getShortMatchView(), getBRElem())
    body.append(getScoreOverView(), getBRElem())
    body.append(getOverDetails(), getBRElem())
    body.append(getExtras(), getBRElem())
    body.appendChild(getButtons(), getBRElem())
}