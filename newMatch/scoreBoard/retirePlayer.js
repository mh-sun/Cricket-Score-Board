import {getDivField} from "../newMatch.js";
import {onStrike, nonStrike, battingTeam, setPlayer} from "./Calc.js";
import {createElemText, updateScoreBoard} from "./scoreBoard.js";
import {player, Batsman} from "./Objects/Player.js";

function setBatsman(div) {
    let d = document.createElement('div')
    createElemText('Select player to retire :', d)
    d.className += ' tb-pad'
    let elem = getDivField('batsmans', 'onstrike', onStrike.name)
    elem.forEach(e=>d.appendChild(e))
    elem = getDivField('batsmans', 'nonstrike', nonStrike.name)
    elem.forEach(e=>d.appendChild(e))
    div.appendChild(d)
}

function getInput(div) {
    let d = document.createElement('div')
    d.innerHTML = 'Replaced by : '
    d.className = 'tb-pad'
    let input = document.createElement('input')
    input.type = 'text'
    input.id = 'replacedPlayer'
    input.placeholder = 'Player Name'
    input.className += ' input'
    d.appendChild(input)
    div.appendChild(d)
}

function submit(div) {
    let submit = document.createElement('input')
    submit.type = 'button'
    submit.value = 'Done'
    submit.className += ' element-center submit-form'

    function func1() {
        let pName = document.getElementById('replacedPlayer').value
        let chosen = document.querySelector('input[name="batsmans"]:checked')? document.querySelector('input[name="batsmans"]:checked').value : null
        if(pName != ''){
            let p1 = new player(pName, new Batsman())
            battingTeam.players.push(p1)
            if(chosen === 'onstrike'){
                onStrike.name += '(r)'
                setPlayer(p1, nonStrike)
            }
            else if (chosen === 'nonstrike'){
                nonStrike.name += '(r)'
                setPlayer(onStrike, p1)
            }
        }
        updateScoreBoard()
    }

    submit.onclick = func1
    div.appendChild(submit)
}

function init() {
    let div = document.getElementById('menu-content')
    div.innerHTML = ''
    div.className = 'pad-20'
    setBatsman(div)
    getInput(div)
    submit(div)
}


export function retirePlayer(){
    init()
}