import { getValue as scoreBoard } from './scoreBoard/scoreBoard.js'
import {Player} from "../Objects/Player.js";
import {getGames, getTeamsFromLS, setGamesToLS, setTeamToLS} from "../Objects/LSUtils.js";


function getSection(name, id) {
    let h3 = document.createElement('h3')
    h3.innerText = name

    let div = document.createElement('div')
    div.className += ' container element-center content-center'
    let input = document.createElement('input')
    input.type = 'text'
    input.id = id
    input.placeholder = 'Team Name'
    input.className += ' input element-center'
    div.appendChild(input)

    return [h3, div]
}

function playerInTeam(player, team) {
    let pl
    team.players.forEach(p=>{
        if(p.name === player) {
            pl = p
            console.log('////////')
        }
    })
    if(pl === undefined) return null
    else return pl
}

function func1(Game) {
    let striker = document.getElementById('striker').value
    let non_striker = document.getElementById('non_striker').value
    let bowler = document.getElementById('bowler').value


    let all_info = [striker, non_striker, bowler]
    let temp = ['Striker Name', 'Non-Striker Name', 'Bowler Name']

    for(let i =0;i<all_info.length;i++){
        if(all_info[i] === null || all_info[i] === undefined || all_info[i] === ''){
            alert(temp[i] + " Not Provided")
            return
        }
    }

    let batTeam = Game.innings[Game.ci].battingTeam
    let bowlTeam = Game.innings[Game.ci].bowlingTeam

    let s, ns, b
    let p = playerInTeam(striker,batTeam)
    if(p === null){
        s = new Player(striker)
        batTeam.players.push(s)
    }
    else s = p
    s.battingRole.isPlaying = true

    p = playerInTeam(non_striker,batTeam)
    if(p === null){
        ns = new Player(non_striker)
        batTeam.players.push(ns)
    }
    else ns = p
    ns.battingRole.isPlaying = true

    p = playerInTeam(bowler,bowlTeam)
    if(p === null){
        b = new Player(bowler)
        bowlTeam.players.push(b)
    }
    else b = p
    b.bowlingRole.isPlaying = true

    Game.innings[Game.ci].setPartnerShip(s.name, ns.name)
    Game.innings[Game.ci].setCurrPlayer(s.name, ns.name, b.name)

    let games = getGames()
    let flag = true
    for(let i = 0; i< games.length; i++){
        if(games[i].id === Game.id){
            games[i] = Game
            flag = false
        }
    }
    if(flag){
        games.push(Game)
    }
    setGamesToLS(games)
    setTeamToLS(batTeam)
    setTeamToLS(bowlTeam)
    scoreBoard(Game)
}

function getSubmit(game) {
    let submit = document.createElement('input')
    submit.type = 'button'
    submit.value = 'Start Match'
    submit.className += ' element-center submit-form'
    submit.onclick = ()=>{
        func1(game)
    }
    return submit
}

function setBody(game) {
    let body  = document.getElementById('menu-content')
    body.innerHTML = ''
    let section = getSection('S T R I K E R', "striker")
    body.appendChild(section[0])
    body.appendChild(section[1])

    section = getSection('N O N - S T R I K E R', "non_striker")
    body.appendChild(section[0])
    body.appendChild(section[1])

    section = getSection('O P E N I N G - B O W L E R', "bowler")
    body.appendChild(section[0])
    body.appendChild(section[1])

    body.appendChild(document.createElement('br'))
    body.appendChild(document.createElement('br'))
    body.appendChild(getSubmit(game))
    body.appendChild(document.createElement('br'))

}

export function getValue(game) {
    setBody(game)
}
