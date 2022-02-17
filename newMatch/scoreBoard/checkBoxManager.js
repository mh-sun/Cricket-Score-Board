import {createElem, extras, updateScoreBoard} from "./scoreBoard.js";
import * as cal from "./Calc.js"
import {battingTeam, bowler, bowlingTeam, game, nonStrike, onStrike, setPlayer} from "./Calc.js";
import {State} from "../../Objects/state.js";
import {getRandPlayer, getRandState} from "../../Objects/GetRandom.js";
import {Player} from "../../Objects/Player.js";

export let wide, noBall, byes, legByes, wicket
export let wickets = ['Bowled', 'Catch out', 'Run out striker', 'Run out non-striker', "Stumping", "LBW", "Hit wicket"]

export function init() {
    wide = document.getElementById(extras[0])
    noBall = document.getElementById(extras[1])
    byes = document.getElementById(extras[2])
    legByes = document.getElementById(extras[3])
    wicket = document.getElementById(extras[4])

}

export function savetoLS() {
    let games = JSON.parse(localStorage.getItem('games'))
    for (let i = 0; i < games.length; i++) {
        if (games[i].id === game.id) {
            games[i] = game
        }
    }
    localStorage.setItem('games', JSON.stringify(games))
}

function setWicketTop() {
    let menu = document.getElementById('menu')
    menu.innerHTML = ''

    let btn = createElem('i', menu, 'fas fa-arrow-left', 'button', 'far-left')
    btn.style.color = 'white'
    btn.style.top = '12px'
    btn.onclick = () => {
        updateScoreBoard()
    }
    let span = document.createElement('span')
    span.classList.add('wicketTop')
    span.innerText = 'Fall of wicket'
    menu.append(span)
}

export function wicketPage() {
    setWicketTop()

    let menuContent = document.getElementById('menu-content')
    menuContent.innerHTML = ''

    let tab = createElem('table', menuContent, 'element-center', 'content-center', 'row-content')
    tab.id = 'wicTab'
    let row1 = createElem('tr', tab)
    let span = createElem('span', row1)
    span.innerText = 'How wicket fall?'

    let row2 = createElem('tr', tab)
    let select = createElem('select', row2)
    select.id = 'myList'

    wickets.forEach(w=>{
        let btn = createElem('option', select)
        btn.innerText = w
        btn.id = w[0].toUpperCase()
        if(w === 'Run out non-striker') btn.id = 'RNS'
        else if(w === 'Run out striker') btn.id = 'RS'
    })

    let sel = document.getElementsByTagName('select')[0]

    sel.onchange = function () {
        console.log(sel.selectedIndex)
        if(sel.selectedIndex === 0) {
            document.getElementById('wh1').hidden = true
            document.getElementById('wh2').hidden = true
        }
        if(sel.selectedIndex === 1) {
            document.getElementById('wh1').hidden = false
            document.getElementById('wh2').hidden = false
        }
        if(sel.selectedIndex === 2) {
            document.getElementById('wh1').hidden = false
            document.getElementById('wh2').hidden = false
        }
        if(sel.selectedIndex === 3) {
            document.getElementById('wh1').hidden = false
            document.getElementById('wh2').hidden = false
        }
        if(sel.selectedIndex === 4) {
            document.getElementById('wh1').hidden = false
            document.getElementById('wh2').hidden = false
        }
        if(sel.selectedIndex === 5) {
            document.getElementById('wh1').hidden = true
            document.getElementById('wh2').hidden = true
        }
        if(sel.selectedIndex === 6) {
            document.getElementById('wh1').hidden = true
            document.getElementById('wh2').hidden = true
        }
    }

    let rowt1 = createElem('tr', tab)
    rowt1.id = 'wh1'
    span = createElem('span', rowt1)
    span.innerText = 'Who helped?'
    rowt1.hidden = true

    let rowt2 = createElem('tr', tab)
    rowt2.id = 'wh2'
    let input = createElem('input', rowt2)
    input.type = 'text'
    input.id = 'helped'
    input.placeholder = 'Player name'
    input.className += ' input element-center'
    rowt2.hidden = true

    let row3 = createElem('tr', tab)
    span = createElem('span', row3)
    span.innerText = 'New batsman'

    let row4 = createElem('tr', tab)
    input = createElem('input', row4)
    input.type = 'text'
    input.id = 'newBatsman'
    input.placeholder = 'Player name'
    input.className += ' input element-center'

    let row5 = createElem('tr', tab)
    let submit = createElem('input', row5)
    submit.style.fontSize = '12px'
    submit.type = 'button'
    submit.value = 'Done'
    submit.className += ' element-center submit-form'
    submit.onclick = ()=>{
        console.log(sel.selectedIndex)
        let newPlayer = document.getElementById('newBatsman').value
        let helped = document.getElementById('helped').value

        let out = onStrike
        let p1 = new Player(newPlayer)
        let p2 = nonStrike

        function searchPlayer(helped) {
            let player
            bowlingTeam.players.forEach(p=>{
                if(p.name === helped) player = p
            })
            if(player === undefined){
                player = new Player(helped)
                bowlingTeam.players.push(player)
            }
            return player
        }

        if(sel.selectedIndex>=1 && sel.selectedIndex <=4){
            if(sel.selectedIndex === 1){
                searchPlayer(helped).fieldingRole.catches++
            }
            if(sel.selectedIndex === 2){
                searchPlayer(helped).fieldingRole.runOuts++
            }
            if(sel.selectedIndex === 3){
                searchPlayer(helped).fieldingRole.runOuts++
                p2 = onStrike
                out = nonStrike
            }
            if(sel.selectedIndex === 4){
                searchPlayer(helped).fieldingRole.stumpings++
            }
            out.battingRole.outInfo.helped = helped
        }

        p1.battingRole.isPlaying = true
        battingTeam.players.push(p1)
        setPlayer(p1, p2)
        game.innings[game.ci].setPartnerShip(p1.name, p2.name)
        out.battingRole.outInfo.isOut = true
        out.battingRole.outInfo.bowler = bowler.name
        out.battingRole.outInfo.type = wickets[sel.selectedIndex]
        savetoLS()
        updateScoreBoard()
    }
}

export function update(x) {
    let flag = true
    let t = game.innings[game.ci].partnerships
    let partnership = t[t.length-1]
    let batRun, batBall, bowlRun, bowlBall

    let checkboxes = []
    if(wicket.checked){
        flag = false
        checkboxes.push('W')
        batRun = 0
        batBall = 1
        bowlRun = x
        bowlBall = 1
    }
    if(noBall.checked ){
        flag = false
        checkboxes.push('NB')
        batRun = x
        batBall = 0
        bowlRun = x+1
        bowlBall = 0
        partnership.updatePInfo(x, 0, 'NB', cal.onStrike.name)

        game.innings[game.ci].extra.noBall ++
    }
    else if(wide.checked){
        flag = false
        checkboxes.push('WD')
        bowlRun = x+1
        bowlBall = 0
        partnership.updatePInfo(x, 0, 'WD', cal.onStrike.name)
        game.innings[game.ci].extra.wide += x+1
    }
    if(byes.checked ){
        flag = false
        checkboxes.push('B')
        if(noBall.checked){
            batRun = 0
            batBall = 1
            bowlRun = x+1
            bowlBall = 0
        }
        else {
            batRun = 0
            batBall = 1
            bowlRun = 0
            bowlBall = 1
        }
        partnership.updatePInfo(x, 1, 'B', cal.onStrike.name)
        game.innings[game.ci].extra.bye ++
    }
    else if(legByes.checked){
        flag = false
        checkboxes.push('LB')
        if(noBall.checked){
            batRun = 0
            batBall = 1
            bowlRun = x+1
            bowlBall = 0
        }
        else {
            batRun = 0
            batBall = 1
            bowlRun = 0
            bowlBall = 1
        }

        partnership.updatePInfo(x, 1, 'LB', cal.onStrike.name)
        game.innings[game.ci].extra.legBye ++
    }

    if(flag){
        checkboxes.push('N')
        batRun = x
        batBall = 1
        bowlRun = x
        bowlBall = 1
        partnership.updatePInfo(x, 1, 'N', cal.onStrike.name)
    }
    function getState() {
        return new State(getRandState(),  cal.onStrike.name, cal.nonStrike.name, cal.bowler.name, x, checkboxes)
    }

    let state = getState()
    if(!wide.checked)cal.onStrike.battingRole.updateInfo(batRun, batBall)
    cal.bowler.bowlingRole.updateInfo(bowlRun, bowlBall, state)
    cal.game.innings[cal.game.ci].setStates(state)
    savetoLS();
}