import * as player from './Objects/Player.js'
import * as team from './Objects/Team.js'
import * as constants from "../../constants.js";
import * as cals from './Calc.js'

let batsmanTable = ['Batsman', 'R', 'B', '4s', '6s', 'SR']
let bowlerTable = ['Bowler', 'O', 'M', 'R', 'W', 'ER']
let extras = ['Wide', 'No-Ball', 'Byes', 'Leg-Byes', 'Wicket']

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
    span.innerText = cals.battingTeam
    span = createSpanByClass('font-40', div)
    span.className += ' left-pad'
    let span_i = createSpanById('total_run', span)
    createElemText('0', span_i)
    createElemText(' - ', span)
    span_i = createSpanById('total_wicket', span)
    createElemText('0', span_i)
    span = createSpanByClass('font-20', div)
    createElemText('(', span)
    span_i = createSpanById("runningOver", span)
    createElemText(')', span)
    createElemText('0.0', span_i)
    span = createSpanByClass('span-far-right', div)
    createElemText('CRR : ', span)
    span_i = createSpanById('runrate', span)
    createElemText('0.0', span_i)


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

function getScoreOverView() {
    let div = document.createElement('div')
    div.className += ' side-pad tb-pad'
    let tab = document.createElement('table')
    tab.id = 'batTable'
    tab.appendChild(getBatTh())
    tab.appendChild(getBowlTh())
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

export function getValue() {
    setCSS()
    const body = document.getElementById('menu-content')
    body.innerHTML = ''
    body.className = 'div-default'
    body.append(getShortMatchView(), getBRElem())
    body.append(getScoreOverView(), getBRElem())
    body.append(getOverDetails(), getBRElem())
    body.append(getExtras(), getBRElem())
}