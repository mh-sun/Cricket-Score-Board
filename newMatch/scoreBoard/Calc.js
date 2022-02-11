import * as scoreBoard from './scoreBoard.js'
import * as exManager from "./checkBoxManager.js"
import {addNewBowler} from "./newBowler.js";
import {getValue} from "../playerInfo.js";
import {updateScoreBoard} from "./scoreBoard.js";

export let battingTeam, bowlingTeam, onStrike, nonStrike, bowler, game

export function initScoreBoard(g) {
    game = g
    battingTeam = game.innings[game.ci].battingTeam
    bowlingTeam = game.innings[game.ci].bowlingTeam

    function getPlayer(name) {
        let p
        game.innings[game.ci].battingTeam.players.forEach(e=>{
            if(e.name === name) p=e
        })
        game.innings[game.ci].bowlingTeam.players.forEach(e=>{
            if(e.name === name) p=e
        })
        return p
    }

    onStrike = getPlayer(game.innings[game.ci].onStrike)
    nonStrike = getPlayer(game.innings[game.ci].nonStrike)
    bowler = getPlayer(game.innings[game.ci].bowler)
}

export function setBowler(b){
    bowler = b
    game.innings[game.ci].setCurrPlayer(onStrike.name, nonStrike.name, b.name)
}

export function setPlayer(onS, nonS){
    onStrike = onS
    nonStrike = nonS
    game.innings[game.ci].setCurrPlayer(onS.name, nonS.name, bowler.name)
}

function newBowlerAdd() {
     addNewBowler()
}

function currentOver() {
    let s = 0
    bowler.bowlingRole.overs_details.forEach(c=>{
        if(c[1] === 'N') s++
    })
    console.log(s)
    return s
}

function endGame() {
    updateScoreBoard()
    let divMbg = document.createElement('div')
    divMbg.classList.add('modal-bg')


    let div = document.createElement('div')
    div.classList.add('modal')

    divMbg.appendChild(div)
    // let div = document.getElementsByClassName('modal')[0]
    div.innerHTML = ''
    div.style.flexDirection = 'column'

    let br = document.createElement('br')
    let h1 = document.createElement('h3')
    h1.innerText = 'CONGRATULATIONS'
    h1.style.textAlign = 'center'
    div.append(h1, br)

    let teamOneRun = Number.parseInt(game.innings[0].battingTeam.getTotalRunsByBatsman() + game.innings[0].getExtras())
    let teamTwoRun = Number.parseInt(game.innings[1].battingTeam.getTotalRunsByBatsman() + game.innings[1].getExtras())
    // let teamOneW = Number.parseInt(game.innings[0].bowlingTeam.getWickets())
    let teamTwoW = Number.parseInt(game.innings[1].bowlingTeam.getWickets())

    console.log(teamOneRun, teamTwoRun)

    let winner, loser, i
    if(teamOneRun > teamTwoRun)
        i = 0
    else if (teamTwoRun > teamOneRun)
        i = 1
    else i = -1

    if(i !== -1){
        winner = game.innings[i].battingTeam
        loser = game.innings[i].bowlingTeam

        h1 = document.createElement('h2')
        h1.innerText = winner.name
        h1.style.textAlign = 'center'
        div.append(h1, br)

        let p = document.createElement('p')
        let span = document.createElement('span')
        span.innerText = winner.name
        p.append(span)

        span = document.createElement('span')
        span.innerText = ' won by '
        p.append(span)

        span = document.createElement('span')
        span.innerText = i === 0 ?
            (teamOneRun-teamTwoRun) + ' runs.':
            (10 - teamTwoW) + ' wickets.'
        p.append(span)
        div.append(p, br)
    }

    let btn = document.createElement('button')
    btn.innerText = 'OK'
    btn.classList.add('button')
    btn.onclick = function (){
        divMbg.classList.remove('bg-active')
    }

    div.append(btn, br)
    document.getElementById('menu-content').append(divMbg)
    divMbg.classList.add('bg-active')
}

function secondInnings() {
    updateScoreBoard()
    let divMbg = document.createElement('div')
    divMbg.classList.add('modal-bg')


    let div = document.createElement('div')
    div.classList.add('modal')

    divMbg.appendChild(div)
    // let div = document.getElementsByClassName('modal')[0]
    div.innerHTML = ''
    div.style.flexDirection = 'column'

    let br = document.createElement('br')
    let h3 = document.createElement('h3')
    h3.innerText = 'End of first innings'
    h3.style.textAlign = 'center'
    div.append(h3, br)

    let p = document.createElement('p')
    let span = document.createElement('span')
    span.innerText = bowlingTeam.name
    p.append(span)

    p.append(document.createTextNode(' need  '))

    span = document.createElement('span')
    let run = battingTeam.getTotalRunsByBatsman() + game.innings[game.ci].getExtras() + 1
    span.innerText = run
    p.append(span)

    p.append(document.createTextNode(' runs in '))

    span = document.createElement('span')
    span.innerText = game.over
    p.append(span)

    p.append(document.createTextNode('overs.'))

    div.append(p)

    p = document.createElement('p')
    p.append(document.createTextNode('Required Run Rate: '))
    span = document.createElement('span')
    span.innerText = (run/(Number.parseInt(game.over)*6)).toPrecision(2)
    p.append(span)

    div.append(p, br)
    let btn = document.createElement('button')
    btn.innerText = 'OK'
    btn.classList.add('button')
    btn.onclick = function (){
        divMbg.classList.remove('bg-active')
        getValue(game)
    }

    div.append(btn, br)
    document.getElementById('menu-content').append(divMbg)
    divMbg.classList.add('bg-active')
}

function inningsOver(){
    let o = Number.parseFloat(battingTeam.getOvers())
    console.log(o)
    if(o >= game.over){
        if(game.ci === 0){
            secondInnings()
            game.ci = 1
            return true
        }
        else if(game.ci === 1){
            endGame()
            return true
        }
        else return false
    }
    else return false
}

function setValues(x) {
    if(inningsOver()) return
    exManager.init()
    exManager.update(x)
    if(x%2 !== 0) swapBatsman()
    if(inningsOver()) return
    if(currentOver() >= 6){
        console.log(battingTeam)
        swapBatsman()
        newBowlerAdd()
    }
    else scoreBoard.updateScoreBoard()
}

export function swapBatsman() {
    let temp = onStrike
    onStrike = nonStrike
    nonStrike = temp
    scoreBoard.updateScoreBoard()
}

export let run = {
    '0':function () {
        setValues(0);
    },
    '1':function () {
        setValues(1)
    },
    '2':function () {
        setValues(2)
    },
    '3':function () {
        setValues(3)
    },
    '4':function () {
        setValues(4)
    },
    '5':function () {
        setValues(5)
    },
    '6':function () {
        setValues(6)
    },
}