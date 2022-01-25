const host_team_name = localStorage.getItem('host_team_name')
const visitor_team_name = localStorage.getItem('visitor_team_name')
const toss_won = localStorage.getItem('team_won')
const opt_to = localStorage.getItem('opt_to')
const over = Number(localStorage.getItem('over'))

let battingTeam = setBattingnBowlingTeam('bat')
let bowlingTeam = setBattingnBowlingTeam('bowl')

let onStrike = new player.player(localStorage.getItem('striker'), new player.Batsman())
let nonStrike = new player.player(localStorage.getItem('non_striker'), new player.Batsman())
battingTeam.players.push(onStrike, nonStrike)

let bowler = new player.player(localStorage.getItem('bowler'), new player.Bowler())
bowlingTeam.players.push(bowler)

function setValues(x) {
    onStrike.battingRole.runs += x
    onStrike.battingRole.balls += 1
    bowler.bowlingRole.balls += 1
    bowler.bowlingRole.runs += x
}

export let run = {
    '0':function () {
        setValues(0);
        scoreBoard.getValue()
    },
    '1':function () {
        setValues(1)
        let temp = onStrike
        onStrike = nonStrike
        nonStrike = temp
        scoreBoard.getValue()
    },
    '2':function () {
        setValues(2)
        scoreBoard.getValue()
    },
    '3':function () {
        setValues(3)
        let temp = onStrike
        onStrike = nonStrike
        nonStrike = temp
        scoreBoard.getValue()
    },
    '4':function () {
        setValues(4)
        scoreBoard.getValue()
    },
    '5':function () {
        setValues(5)
        let temp = onStrike
        onStrike = nonStrike
        nonStrike = temp
        scoreBoard.getValue()
    },
    '6':function () {
        setValues(6)
        scoreBoard.getValue()
    },
}

function setBattingnBowlingTeam (seek){
    let battingTeam, bowlingTeam
    if(toss_won === host_team_name){
        if(opt_to === 'opt_bat'){
            battingTeam = host_team_name
            bowlingTeam = visitor_team_name
        }
        else {
            battingTeam = visitor_team_name
            bowlingTeam = host_team_name
        }
    }
    else {
        if(opt_to === 'opt_bat'){
            battingTeam = visitor_team_name
            bowlingTeam = host_team_name
        }
        else {
            battingTeam = host_team_name
            bowlingTeam = visitor_team_name
        }
    }
    battingTeam = new team.Team(battingTeam)
    bowlingTeam = new team.Team(bowlingTeam)
    return seek === 'bat' ? battingTeam : seek === 'bowl' ? bowlingTeam : null
}


import * as team from './Objects/Team.js'
import * as player from './Objects/Player.js'
import * as innings from './Objects/Innings.js'
import * as game from './Objects/Game.js'
import * as scoreBoard from './scoreBoard.js'
export {battingTeam, bowlingTeam, onStrike, nonStrike, bowler}