import {createElem, createElemText} from "../newMatch/scoreBoard/scoreBoard.js";
import {getRandColor} from "../Objects/GetRandom.js";
import {getValue as scboard} from "../newMatch/scoreBoard/scoreBoard.js";
import {Game} from "../Objects/Game.js";
import {setMenuSC} from "./fullScoreboard.js";

function deleteGame(g, games) {
    for(let i = 0; i< games.length; i++){
        if(games[i].id === g.id){
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
    tab.id = 'gameTab'
    tab.classList.add('table-100')

    tab.appendChild(getRow(game, game.innings[0].battingTeam, game.innings[0].bowlingTeam, tab, 0))
    tab.appendChild(getRow(game, game.innings[1].battingTeam, game.innings[1].bowlingTeam, tab, 1))

    createElem('br',div)

    let preMatch = createElem('div', div)
    preMatch.style.paddingLeft = '5%'

    if(game.ci === 0){
        createElem('span', preMatch).innerText = game.tossWon
        createElemText(' Won the toss and opted to ', preMatch)
        createElem('span', preMatch).innerText = game.opt
        createElemText(' first', preMatch)
    }
    else if(game.ci === 1 && !game.result.isEnd){
        let p = document.createElement('p')
        let span = document.createElement('span')
        span.innerText = game.innings[0].bowlingTeam.name
        p.append(span)

        p.append(document.createTextNode(' need  '))

        span = document.createElement('span')
        let run = game.innings[0].battingTeam.getTotalRunsByBatsman() + game.innings[0].getExtras() + 1
        span.innerText = run
        p.append(span)

        p.append(document.createTextNode(' runs to win.'))

        preMatch.append(p)
    }
    else if(game.result.isEnd && !game.result.isDraw){
        let teamOneRun = Number.parseInt(game.innings[0].battingTeam.getTotalRunsByBatsman() + game.innings[0].getExtras())
        let teamTwoRun = Number.parseInt(game.innings[1].battingTeam.getTotalRunsByBatsman() + game.innings[1].getExtras())
        let teamTwoW = Number.parseInt(game.innings[1].bowlingTeam.getWickets())
        let p = document.createElement('p')
        let span = document.createElement('span')
        span.innerText = game.result.winner
        p.append(span)

        span = document.createElement('span')
        span.innerText = ' won by '
        p.append(span)

        span = document.createElement('span')
        let i
        if(teamOneRun > teamTwoRun)
            i = 0
        else if (teamTwoRun > teamOneRun)
            i = 1
        else i = -1
        span.innerText = i === 0 ?
            (teamOneRun-teamTwoRun) + ' runs.':
            (10 - teamTwoW) + ' wickets.'
        p.append(span)
        preMatch.append(p, document.createElement('br'))
    }
    else if(game.result.isDraw){
        let p = document.createElement('p')
        let span = document.createElement('span')
        span.innerText = 'Match is tie'
        p.append(span)
        preMatch.append(p)
    }

    createElem('br',div)

    tab = createElem('table', div)
    tab.style.textAlign = 'center'
    tab.classList.add('table-100')
    let row = createElem('tr', tab)

    if(!game.result.isEnd){
        let resume = createElem('td', row, 'button')
        resume.style.textAlign = 'center'
        resume.style.width = '30%'
        resume.innerText = 'Resume'
        resume.id = 'resume'
        resume.onclick = ()=>{
            scboard(game)
        }
    }

    let scoreboard = createElem('td', row, 'button')
    scoreboard.style.textAlign = 'center'
    scoreboard.style.width = '30%'
    scoreboard.innerText = 'Scoreboard'
    scoreboard.onclick = ()=>{
        setMenuSC(game)
    }

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
    if(games == null || games.length === 0){
        menuContent.append(EmptyGeam())
    }else {
        for(let i = games.length-1; i>=0 ; i--){
            let g = games[i]
            if(g != null){
                let tempG = new Game().initLS(g)
                menuContent.append(getSection(tempG, games), document.createElement('br'))
                // if(tempG.result.isEnd) document.getElementById('resume').remove()
                // console.log(tempG.result)
                // console.log(document.getElementById('resume'))
            }
        }
    }
}

export {getValue}