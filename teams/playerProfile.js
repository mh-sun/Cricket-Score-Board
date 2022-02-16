import {playersInTeam} from "./playersInTeam.js";
import {setTitle, setMenu as setMenuBar} from "../main.js";
import {Player} from "../Objects/Player.js";
import {getGames} from "../Objects/LSUtils.js";

let playerGlobal
let battingValues = {
    'Matches' : 0,
    'Innings' : 0,
    'Runs' : 0,
    'Not Outs' : 0,
    'Best Score' : 0,
    'Strike Rate' : 0,
    'Average' : 0,
    'Fours' : 0,
    'Sixes' : 0,
    'Thirties' : 0,
    'Fifties' : 0,
    'Hundreds' : 0,
    'Ducks' : 0,
}
let bowlingValues = {
    'Matches': 0,
    'Innings': 0,
    'Overs': 0,
    'Maidens': 0,
    'Wickets': 0,
    'Runs': 0,
    'B. Bowling': 0,
    'Eco. Rate': 0,
    'Strike Rate': 0,
    'Average': 0,
    'Wides': 0,
    'No Balls': 0,
    'Dots balls': 0,
    '4 Wickets': 0,
    '5 Wickets': 0,
}
let fieldingValues = {
    'Matches': 0,
    'Catches': 0,
    'Stumpings': 0,
    'Run Outs': 0,
}

function getBatValue() {
    let games = getGames()
    let m = 0, i = 0, r = 0, no = 0, bs = 0, sr, a, fo = 0, s = 0, t = 0, fi = 0, h = 0, d = 0
    let b = 0
    games.forEach(g=>{
        let mflag = false
        g.innings[0].battingTeam.players.forEach(p=>{
            if(p.name === playerGlobal.name) {
                mflag = true
                r+=p.battingRole.runs
                b+=p.battingRole.balls
                no += p.battingRole.outInfo.isOut? 0 : 1
                if(p.battingRole.runs >= bs) bs = p.battingRole.runs
                fo+=p.battingRole.fours
                s+=p.battingRole.sixes
                if(p.battingRole.runs >= 100) h++
                else if(p.battingRole.runs >= 50) fi++
                else if(p.battingRole.runs >= 30) t++
                if(p.battingRole.runs === 0 && p.battingRole.balls !== 0) d++
            }
        })

        if(mflag) i++
        mflag = false

        g.innings[1].battingTeam.players.forEach(p=>{
            if(p.name === playerGlobal.name) {
                mflag = true
                r+=p.battingRole.runs
                b+=p.battingRole.balls
                no += p.battingRole.outInfo.isOut? 0 : 1
                if(p.battingRole.runs >= bs) bs = p.battingRole.runs
                fo+=p.battingRole.fours
                s+=p.battingRole.sixes
                if(p.battingRole.runs >= 100) h++
                else if(p.battingRole.runs >= 50) fi++
                else if(p.battingRole.runs >= 30) t++
                if(p.battingRole.runs === 0 && p.battingRole.balls !== 0) d++
            }
        })

        if(mflag) {
            m++
            i++
        }
    })
    sr = (r/b*100).toPrecision(3)
    sr = (!isNaN(sr) && isFinite(sr))? sr : 0

    a = (r/m).toPrecision(3)
    a = (!isNaN(a) && isFinite(a))? a : 0

    battingValues = {
        'Matches' : m,
        'Innings' : i,
        'Runs' : r,
        'Not Outs' : no,
        'Best Score' : bs,
        'Strike Rate' : sr,
        'Average' : a,
        'Fours' : fo,
        'Sixes' : s,
        'Thirties' : t,
        'Fifties' : fi,
        'Hundreds' : h,
        'Ducks' : d,
    }
}

function getBowlValue() {
    let games = getGames()
    let match = 0, innings = 0, overs = 0, maidens = 0, wickets = 0, runs = 0, b_bowling = 0, eco_rate = 0, strike_rate = 0, average = 0, wides = 0, no_balls = 0, dot_balls = 0, fo_wic = 0, fi_wic = 0
    let balls = 0
    games.forEach(g=>{
        let mflag = false

        g.innings[0].bowlingTeam.players.forEach(p=>{
            if(p.name === playerGlobal.name) {
                mflag = true
                balls += p.bowlingRole.balls
                runs += p.bowlingRole.runs
                maidens += p.bowlingRole.maidens
                wickets += p.bowlingRole.wickets
                wides += p.bowlingRole.wides
                no_balls += p.bowlingRole.noBalls
                dot_balls += p.bowlingRole.dotBalls
                if(p.bowlingRole.wickets >= 5) fi_wic++
                else if(p.bowlingRole.wickets >= 4) fo_wic++
            }
        })

        if(mflag) innings++
        mflag = false

        g.innings[1].bowlingTeam.players.forEach(p=>{
            if(p.name === playerGlobal.name) {
                mflag = true
                balls += p.bowlingRole.balls
                runs += p.bowlingRole.runs
                maidens += p.bowlingRole.maidens
                wickets += p.bowlingRole.wickets
                wides += p.bowlingRole.wides
                no_balls += p.bowlingRole.noBalls
                dot_balls += p.bowlingRole.dotBalls
                if(p.bowlingRole.wickets >= 5) fi_wic++
                else if(p.bowlingRole.wickets >= 4) fo_wic++
            }
        })

        if(mflag) {
            match++
            innings++
        }
    })
    overs = Math.floor(balls/6) + '.' + balls%6
    let ans = (runs/balls*6).toPrecision(3)
    eco_rate = (!isNaN(ans) && isFinite(ans))? ans : 0

    ans = (balls/wickets).toPrecision(3)
    strike_rate = (!isNaN(ans) && isFinite(ans))? ans : 0

    ans = (runs/wickets).toPrecision(3)
    average = (!isNaN(ans) && isFinite(ans))? ans : 0

    b_bowling = '-'

    bowlingValues = {
        'Matches': match,
        'Innings': innings,
        'Overs': overs,
        'Maidens': maidens,
        'Wickets': wickets,
        'Runs': runs,
        'B. Bowling': b_bowling,
        'Eco. Rate': eco_rate,
        'Strike Rate': strike_rate,
        'Average': average,
        'Wides': wides,
        'No Balls': no_balls,
        'Dots balls': dot_balls,
        '4 Wickets': fo_wic,
        '5 Wickets': fi_wic,
    }
}

function getFieldValue() {
    let games = getGames()
    let match = 0, catches = 0, stumps = 0, run_outs = 0
    games.forEach(g=>{
        let mflag = false
        g.innings[0].bowlingTeam.players.forEach(p=>{
            if(p.name === playerGlobal.name) {
                mflag = true
                catches += p.fieldingRole.catches
                stumps += p.fieldingRole.stumpings
                run_outs += p.fieldingRole.runOuts
            }
        })
        g.innings[1].bowlingTeam.players.forEach(p=>{
            if(p.name === playerGlobal.name) {
                mflag = true
                catches += p.fieldingRole.catches
                stumps += p.fieldingRole.stumpings
                run_outs += p.fieldingRole.runOuts
            }
        })

        if(mflag) {
            match++
        }
    })
    fieldingValues = {
        'Matches': match,
        'Catches': catches,
        'Stumpings': stumps,
        'Run Outs': run_outs,
    }
}

function createCard(v, obj) {
    let div = document.createElement('div')
    div.className = 'card'
    let divi = document.createElement('span')
    divi.innerText = v
    div.append(divi)
    divi = document.createElement('span')
    divi.innerText = obj[v]
    div.append(divi)
    return div
}

function battingProfile() {
    let menu = document.getElementById('menu-content')
    menu.innerHTML = ''
    let div = document.createElement('div')
    div.classList.add('card-back')

    getBatValue()

    Object.keys(battingValues).forEach(v=>{
        div.append(createCard(v, battingValues))
    })
    menu.append(div)
}

function bowlingProfile() {
    let menu = document.getElementById('menu-content')
    menu.innerHTML = ''
    let div = document.createElement('div')
    div.classList.add('card-back')

    getBowlValue()

    Object.keys(bowlingValues).forEach(v=>{
        div.append(createCard(v, bowlingValues))
    })
    menu.append(div)
}

function fieldingProfile() {
    let menu = document.getElementById('menu-content')
    menu.innerHTML = ''
    let div = document.createElement('div')
    div.classList.add('card-back')

    getFieldValue()

    Object.keys(fieldingValues).forEach(v=>{
        div.append(createCard(v, fieldingValues))
    })
    menu.append(div)

}

function createElement(name, textContent,  ...classNames) {
    let elem = document.createElement(name)
    elem.textContent = textContent

    classNames.forEach( className => elem.className+= ' ' + className)
    return elem
}

function setMenu() {
    let menu = document.getElementById('menu')
    menu.innerHTML = ''
    let bat = createElement('a', 'Batting')
    bat.onclick = function () {
        battingProfile()
    }
    menu.appendChild(bat)

    let bowl = createElement('a', 'Bowling')
    bowl.onclick = function () {
        bowlingProfile()
    }
    menu.appendChild(bowl)

    let field = createElement('a', 'Fielding')
    field.onclick = function () {
        fieldingProfile()
    }
    menu.appendChild(field)

    menu.className = 'topnav content-center'
}

function setTop(team) {
    let menu = document.getElementById('title')
    menu.innerHTML = ''

    let div = document.createElement('div')
    div.className = 'player-prof-top'
    div.style.fontSize = '16px'
    div.style.textAlign = 'left'
    let i = document.createElement('i')
    i.className = 'fas fa-arrow-left'
    i.onclick = function () {
        setTitle()
        setMenuBar()
        playersInTeam(team)
    }
    div.append(i)

    let div1 = document.createElement('div')
    div1.className = 'player-prof-top'
    if(playerGlobal.image === '') {
        let i = document.createElement('i')
        i.style.fontSize = '100px'
        i.className = 'fas fa-user'
        div1.append(i)
    }
    else menu.style.backgroundImage = playerGlobal.image

    let div2 = document.createElement('div')
    div2.style.fontSize = '28px'
    div2.style.textAlign = 'left'
    div2.className = 'player-prof-top'
    div2.innerText = playerGlobal.name

    menu.append(div, div1, div2)
}


export function playerProfile(player, team) {
    playerGlobal = player
    setTop(team)
    setMenu()
    battingProfile()
}