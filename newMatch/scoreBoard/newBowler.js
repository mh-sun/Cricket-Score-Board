import {updateScoreBoard} from "./scoreBoard.js";
import {bowlingTeam, game, setBowler} from "./Calc.js";
import {Player} from "./Objects/Player.js";
import {savetoLS} from "./checkBoxManager.js";

function submit() {
    let submit = document.createElement('input')
    submit.type = 'button'
    submit.value = 'Done'
    submit.className += ' element-center submit-form'

    function func1() {
        let temp = document.getElementById('newBowler')
        console.log(bowlingTeam.players)
        function isExist(value) {
            for(let i =0 ; i< bowlingTeam.players.length; i++){
                let e = bowlingTeam.players[i]
                if(e.name === value) {
                    return e
                }
            }
            return false
        }
        let z = isExist(temp.value)
        if(temp.value === ''){
            alert('Provide a bowler\'s name')
        }
        else if(!z){
            let b = new Player(temp.value)
            bowlingTeam.players.push(b)
            setBowler(b)
            savetoLS()
            updateScoreBoard()
        }
        else {
            setBowler(z)
            savetoLS()
            updateScoreBoard()
        }
    }

    submit.onclick = func1
    return submit
}

function getTop() {
    let div = document.createElement('div')
    div.classList.add('bowlerAdd')
    div.classList.add('tb-pad')
    let back = document.createElement('i')
    back.className = 'fas fa-arrow-left'
    back.onclick = function () {
        updateScoreBoard()
    }
    div.appendChild(back)
    div.appendChild(document.createTextNode('Choose bowler'))
    return div
}

function getLabel() {
    let div = document.createElement('div')
    div.style.textAlign = 'center'
    div.innerText = 'Select a new bowler'
    return div
}

function getInput() {
    let inp = document.createElement('input')
    inp.id = 'newBowler'
    inp.classList.add('input')
    inp.placeholder = 'Name'
    return inp
}

function init(div) {
    div.className = 'pad-20'
    div.append(getTop(), document.createElement('br'), document.createElement('br'))

    let d = document.createElement('div')
    d.classList.add('content-center')
    d.classList.add('row-content')

    d.append(getLabel())
    d.append(getInput())
    d.append(submit())
    div.append(d)

}

export function addNewBowler() {
    document.getElementById('menu').innerHTML = ''
    let div = document.getElementById('menu-content')
    div.innerHTML = ''
    init(div)
}