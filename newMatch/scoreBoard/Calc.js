import * as team from './Objects/Team.js'
import * as player from './Objects/Player.js'
import * as innings from './Objects/Innings.js'
import * as g from './Objects/Game.js'
import * as scoreBoard from './scoreBoard.js'
import * as exManager from "./checkBoxManager.js"
import {getGame, getPlayer, getTeam} from "./Objects/getObjects.js";

export let battingTeam, bowlingTeam, onStrike, nonStrike, bowler, game

export function initScoreBoard(g) {
    game = getGame(g)
    console.log('From Init Scoreboard')
    battingTeam = getTeam(game.innings[game.ci].battingTeam)
    bowlingTeam = getTeam(game.innings[game.ci].bowlingTeam)
    console.log(battingTeam)
    onStrike = getPlayer(battingTeam.players[0])
    nonStrike = getPlayer(battingTeam.players[1])

    bowler = getPlayer(bowlingTeam.players[0])
}

export function setPlayer(onS, nonS){
    onStrike = onS
    nonStrike = nonS
}

function newBowlerAdd() {
     
}

function setValues(x) {
    exManager.init()
    exManager.update(x)
    if((bowler.bowlingRole.overs_details.length - bowler.bowlingRole.extra) === 6){
        swapBatsman()
        newBowlerAdd()
    }
}

export function swapBatsman() {
    let temp = onStrike
    onStrike = nonStrike
    nonStrike = temp
    scoreBoard.updateScoreBoard()
}

export let run = {
    '0':function () {
        setValues(0);
        scoreBoard.updateScoreBoard()
    },
    '1':function () {
        setValues(1)
        swapBatsman()
    },
    '2':function () {
        setValues(2)
        scoreBoard.updateScoreBoard()
    },
    '3':function () {
        setValues(3)
        swapBatsman()
    },
    '4':function () {
        setValues(4)
        scoreBoard.updateScoreBoard()
    },
    '5':function () {
        setValues(5)
        swapBatsman()
    },
    '6':function () {
        setValues(6)
        scoreBoard.updateScoreBoard()
    },
}
//
// function setBattingnBowlingTeam (seek){
//     let batTeam, bowlTeam
//     if(toss_won === host_team_name){
//         if(opt_to === 'opt_bat'){
//             batTeam = host_team_name
//             bowlTeam = visitor_team_name
//         }
//         else {
//             batTeam = visitor_team_name
//             bowlTeam = host_team_name
//         }
//     }
//     else {
//         if(opt_to === 'opt_bat'){
//             batTeam = visitor_team_name
//             bowlTeam = host_team_name
//         }
//         else {
//             batTeam = host_team_name
//             bowlTeam = visitor_team_name
//         }
//     }
//     battingTeam = new team.Team(batTeam)
//     bowlingTeam = new team.Team(bowlTeam)
//
//
//     return seek === 'bat' ? battingTeam : seek === 'bowl' ? bowlingTeam : null
// }