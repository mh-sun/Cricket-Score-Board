import { getValue as playerInfo } from './playerInfo.js'
import {Team} from "./scoreBoard/Objects/Team.js";
import {Game, GameLS} from "./scoreBoard/Objects/Game.js";

function getValue() {
    let menuContent = document.getElementById('menu-content')

    menuContent.innerHTML = ''

    menuContent.appendChild(getTeamsName())
    menuContent.appendChild(getTossWon())
    menuContent.appendChild(getOptedTo())
    menuContent.appendChild(getOver())
    menuContent.appendChild(document.createElement('br'))
    menuContent.appendChild(document.createElement('br'))
    menuContent.appendChild(getSubmit())
    menuContent.appendChild(document.createElement('br'))
}

function getInputField(id, ph) {
    let input1 = document.createElement('input')
    input1.type = 'text'
    input1.id = id
    input1.placeholder = ph
    input1.className = 'input'

    return input1
}

function getTeamsName() {
    let div_out = document.createElement('div')

    let h3 = document.createElement('h3')
    h3.innerText = 'Teams'

    let div_in = document.createElement('div')
    let form = document.createElement('form')
    form.appendChild(getInputField('hostName', 'Host Team'))
    form.appendChild(getInputField('visitorName', 'Visitor Team'))
    div_in.appendChild(form)
    div_in.className += ' element-center container content-center'
    div_out.append(h3, div_in)

    return div_out
}


export function getDivField(name, value, inner) {
    let input1 = document.createElement('input')
    input1.type = 'radio'
    input1.name = name
    input1.value = value

    let label = document.createElement('label')
    label.innerText = inner

    return [input1, label]
}

function getTossWon() {
    let div_o = document.createElement('div')
    let h3 = document.createElement('h3')
    h3.innerText = 'Toss Won By?'
    let div_i = document.createElement('div')
    div_i.className += ' container content-center element-center'

    let out = getDivField('team_won', 'host_team', 'Host Team')
    div_i.appendChild(out[0])
    div_i.appendChild(out[1])

    out = getDivField('team_won', 'visitor_team', 'Visitor Team')
    div_i.appendChild(out[0])
    div_i.appendChild(out[1])


    div_o.appendChild(h3)
    div_o.appendChild(div_i)

    return div_o
}


function getOptedTo() {
    let div_o = document.createElement('div')
    let h3 = document.createElement('h3')
    h3.innerText = 'Opted To?'
    let div_i = document.createElement('div')
    div_i.className += ' container content-center element-center'

    let out = getDivField('opt_to', 'Bat', 'Bat')
    div_i.appendChild(out[0])
    div_i.appendChild(out[1])

    out = getDivField('opt_to', 'Bowl', 'Bowl')
    div_i.appendChild(out[0])
    div_i.appendChild(out[1])


    div_o.appendChild(h3)
    div_o.appendChild(div_i)

    return div_o
}

function getOver() {
    let div_out = document.createElement('div')

    let h3 = document.createElement('h3')
    h3.innerText = 'Over?'

    let div_in = document.createElement('div')
    let inp = getInputField('match_over', '16')
    inp.className += ' input element-center'
    div_in.appendChild(inp)
    div_in.className += ' element-center container content-center'
    div_out.append(h3, div_in)

    return div_out
}

function getSubmit(){
    let submit = document.createElement('input')
    submit.type = 'button'
    submit.value = 'Start Match'
    submit.className += ' element-center submit-form'
    submit.onclick = func1
    return submit
}
function SaveIntoLocal(host_team_name, visitor_team_name, team_won, opt_to, over) {
    let tBat, tBowl;
    if( team_won === host_team_name){
        if(opt_to === 'Bat'){
            tBat = host_team_name
            tBowl = visitor_team_name
        }
        else {
            tBat = visitor_team_name
            tBowl = host_team_name
        }
    }
    else {
        if(opt_to === 'Bat'){
            tBat = visitor_team_name
            tBowl = host_team_name
        }
        else {
            tBat = host_team_name
            tBowl = visitor_team_name
        }
    }

    tBat = new Team(tBat, [])
    tBowl = new Team(tBowl, [])

    let newGame = new Game(tBat, tBowl,team_won, opt_to, over)

    let games = JSON.parse(localStorage.getItem('games'))

    if(games == null) {
        games = []
        games.push(newGame)
    }
    else games.push(newGame)

    localStorage.setItem('games', JSON.stringify(games))
    return newGame
}
function func1(){
    let host_team_name = document.getElementById('hostName').value
    let visitor_team_name = document.getElementById('visitorName').value
    let team_won = document.querySelector('input[name="team_won"]:checked')? document.querySelector('input[name="team_won"]:checked').value : null
    team_won = team_won === 'host_team'? host_team_name : visitor_team_name
    let opt_to = document.querySelector('input[name="opt_to"]:checked')? document.querySelector('input[name="opt_to"]:checked').value : null
    let over = document.getElementById('match_over').value
    over = Number(over)

    let all_info = [host_team_name, visitor_team_name, team_won, opt_to, over]
    let temp = ['Host Team Name', 'Visitor Team Name', 'Toss winner', 'Opt', 'Match Over']

    for(let i =0;i<all_info.length;i++){
        if(all_info[i] === null || all_info[i] === undefined || all_info[i] === '' || all_info[i] <= 0){
            alert(temp[i] + " Not Provided")
            return
        }
    }

    let newGame = SaveIntoLocal(host_team_name, visitor_team_name, team_won, opt_to, over)
    playerInfo(newGame)
}

(function () {
    // let games = JSON.parse(localStorage.getItem('games'))
    // if(games != null){
    //     let game = new GameLS(games[games.length-1])
    //     playerInfo(game)
    // }
    getValue();
})();
export {getValue}