import {player} from './Objects/Player.js'
import * as cals from './Calc.js'

function setCSS() {
    let head = document.getElementsByTagName('head')[0]

    let css = document.createElement('link')
    css.rel = 'stylesheet'
    css.type = 'text/css'
    css.href = '../../../css/scoreBoard.css'
    head.appendChild(css)
}

function createSpanById(id) {
    let span  = document.createElement('span')
    span.id = id
    return span
}

function createSpanByClass(className) {
    let span  = document.createElement('span')
    span.className = className
    return span
}
function getShortMatchView() {
    let div = document.createElement('div')
    let h3 = document.createElement('h3')
    div.appendChild(h3)
    h3.appendChild(document.createTextNode('Batting : '))
    let span = createSpanById('battingTeam')
    span.innerText = cals.battingTeam
    h3.appendChild(span)
    span = createSpanByClass('font-40')
    div.appendChild(span)
    let span_i = createSpanById('total_run')
    span.appendChild(span_i)
    span_i.appendChild(document.createTextNode('0'))
    span.appendChild(document.createTextNode(' - '))
    span_i = createSpanById('total_wicket')
    span.appendChild(span_i)
    span_i.appendChild(document.createTextNode('0'))
    span = createSpanByClass('font-20')
    div.appendChild(span)
    span_i = createSpanById("runningOver")
    span_i.appendChild(document.createTextNode('0.0'))
    span.append(document.createTextNode('('),span_i,document.createTextNode(')'))
    span = createSpanByClass('span-far-right')
    div.appendChild(span)
    span_i = createSpanById('runrate')
    span_i.appendChild(document.createTextNode('0.0'))
    span.append(document.createTextNode('CRR : '), span_i)
    return div
}

function getScoreOverView() {
    let div = document.createElement('div')

    return div
}

export function getValue() {
    setCSS()
    const body = document.getElementById('menu-content')
    body.appendChild(getShortMatchView())
    body.appendChild(getScoreOverView())
}