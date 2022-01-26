import * as team from './Objects/Team.js'
import * as player from './Objects/Player.js'
import * as innings from './Objects/Innings.js'
import * as game from './Objects/Game.js'
import * as scoreBoard from './scoreBoard.js'

const host_team_name = localStorage.getItem('host_team_name')
const visitor_team_name = localStorage.getItem('visitor_team_name')
const toss_won = localStorage.getItem('team_won')
const opt_to = localStorage.getItem('opt_to')
const over = Number(localStorage.getItem('over'))

let battingTeam, bowlingTeam, onStrike, nonStrike, bowler;


export function init() {
    // battingTeam = setBattingnBowlingTeam('bat')
    // bowlingTeam = setBattingnBowlingTeam('bowl')
    setBattingnBowlingTeam()

    onStrike = new player.player(localStorage.getItem('striker'), new player.Batsman())
    nonStrike = new player.player(localStorage.getItem('non_striker'), new player.Batsman())
    battingTeam.players.push(onStrike, nonStrike)

    bowler = new player.player(localStorage.getItem('bowler'), new player.Bowler())
    bowlingTeam.players.push(bowler)
}


function updateOverDetails(x) {
    scoreBoard.overdetails.push(x)
}

function setValues(x) {
    bowler.bowlingRole.updateInfo(x)
    onStrike.battingRole.updateInfo(x)
    console.log(bowler)
    // updateOverDetails(x)
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

function setBattingnBowlingTeam (){
    let batTeam, bowlTeam
    if(battingTeam === undefined || bowlingTeam === undefined || battingTeam === null || bowlingTeam === null){

        if(toss_won === host_team_name){
            if(opt_to === 'opt_bat'){
                batTeam = host_team_name
                bowlTeam = visitor_team_name
            }
            else {
                batTeam = visitor_team_name
                bowlTeam = host_team_name
            }
        }
        else {
            if(opt_to === 'opt_bat'){
                batTeam = visitor_team_name
                bowlTeam = host_team_name
            }
            else {
                batTeam = host_team_name
                bowlTeam = visitor_team_name
            }
        }
        battingTeam = new team.Team(batTeam)
        bowlingTeam = new team.Team(bowlTeam)
    }

    // return seek === 'bat' ? this.battingTeam : seek === 'bowl' ? this.bowlingTeam : null
}
export {battingTeam, bowlingTeam, onStrike, nonStrike, bowler}