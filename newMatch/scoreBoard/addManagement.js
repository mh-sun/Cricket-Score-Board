import {battingTeam, bowler, bowlingTeam, game, nonStrike, onStrike, run} from "./Calc.js";
import {createElem, updateScoreBoard} from "./scoreBoard.js";
import * as cal from "./Calc.js";
import {savetoLS} from "./checkBoxManager.js";

export function undo() {
    let state = game.innings[game.ci].states.pop()
    console.log(state)

    function getPlayerByName(name, team) {
        for(let i = 0; i<team.players.length; i++){
            if(team.players[i].name == name){
                return team.players[i]
            }
        }
        return null
    }

    cal.setPlayer(
        getPlayerByName(state.striker, battingTeam),
        getPlayerByName(state.nonStriker, battingTeam)
    )
    cal.setBowler(getPlayerByName(state.bowler, bowlingTeam))
    let t = game.innings[game.ci].partnerships
    let partnership = t[t.length-1]

    let x = state.run * -1
    let s = '-' + state.extras[0]

    if(s === '-W'){
        cal.onStrike.battingRole.updateInfo(0,-1)
        cal.bowler.bowlingRole.updateInfo(x,-1, s)
    }
    if(s === '-NB'){
        cal.onStrike.battingRole.updateInfo(x, -1)
        cal.bowler.bowlingRole.updateInfo((x-1), 0, s)
        partnership.updatePInfo(x, 0, s, cal.onStrike)

        game.innings[game.ci].extra.noBall--
    }
    else if(s === '-WD'){
        console.log(cal.bowler.bowlingRole)
        cal.bowler.bowlingRole.updateInfo((x-1),0, s)
        partnership.updatePInfo(x, 0, s, cal.onStrike)
        game.innings[game.ci].extra.wide += (x-1)
    }
    if(s === '-B'){
        cal.onStrike.battingRole.updateInfo(0, -1)
        cal.bowler.bowlingRole.updateInfo(0, -1, s)
        partnership.updatePInfo(x, -1, s, cal.onStrike)
        game.innings[game.ci].extra.bye--
    }
    else if(s === '-LB'){
        cal.onStrike.battingRole.updateInfo(0, -1)
        cal.bowler.bowlingRole.updateInfo(0, -1, s)
        partnership.updatePInfo(x, -1, s, cal.onStrike)
        game.innings[game.ci].extra.legBye--
    }
    if(s === '-N'){
        cal.onStrike.battingRole.updateInfo(x, -1)
        cal.bowler.bowlingRole.updateInfo(x, -1, s)
        partnership.updatePInfo(x, -1, s, cal.onStrike)
    }
    savetoLS()
    updateScoreBoard()
}

function updateProgressBar(run, partnership, i) {
    let elem = document.getElementById("myBar");
    console.log(run, partnership)
    let w = isNaN(run*100/partnership)? 0: Math.floor(run/partnership*87)
    elem.style.width = w+'%'
}

function updatePartnership() {
    let div = document.getElementsByClassName('modal')[0]
    div.innerHTML = ''
    console.log(game.innings[game.ci].partnerships)

    game.innings[game.ci].partnerships.forEach(partnership=>{
        function getEachPartnership(partnership) {
            let div = document.createElement('div')
            let div_i = createElem('div', div)

            createElem('span', div_i, 'font-20').innerText = partnership.playerOne.name
            createElem('span', div_i, 'font-20').innerText = partnership.playerOneRun

            createElem('span', div_i, 'font-10').innerText = ("Extras:" + partnership.extras)
            div_i.classList.add('left-div')

            div_i = createElem('div', div)
            createElem('span', div_i, 'font-20').innerText = partnership.runs
            createElem('span', div_i, 'font-20').innerText = ("(" + partnership.balls + ')')
            div_i.classList.add('center-div')

            div_i = createElem('div', div)
            createElem('span', div_i, 'font-20').innerText = partnership.playerTwo.name
            createElem('span', div_i, 'font-20').innerText = partnership.playerTwoRun
            div_i.classList.add('right-div')

            return div
        }

        div.append(getEachPartnership(partnership))
        // updateProgressBar(partnership.playerOneRun, partnership.runs, 1)
        div.classList.add('element-center')
        div.style.flexDirection = 'column'
    })
}

export function getPartnership() {
    updateScoreBoard()
    updatePartnership()
    document.getElementsByClassName('modal-bg')[0].classList.add('bg-active')
}

export function getModal() {
    let div = document.createElement('div')
    div.classList.add('modal-bg')
    // div.classList.add('bg-active')

    let div_i = document.createElement('div')
    div_i.classList.add('modal')
    div.appendChild(div_i)

    let h4 = document.createElement('h4')
    div_i.appendChild(h4)
    let innings = game.innings[game.ci]
    h4.innerText = 'Extras: '+ innings.extra.bye+ ' B, '
    +innings.extra.legBye + ' LB, '
    +innings.extra.wide + ' WD, '
    +innings.extra.noBall + ' NB, '
    +innings.extra.penalty + ' P'

    div.addEventListener('click',function () {
        div.classList.remove('bg-active')
    })

    return div

}

export function getExtraRun() {
    updateScoreBoard()
    document.getElementsByClassName('modal-bg')[0].classList.add('bg-active')
}

