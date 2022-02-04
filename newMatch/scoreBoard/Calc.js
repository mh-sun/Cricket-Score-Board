import * as scoreBoard from './scoreBoard.js'
import * as exManager from "./checkBoxManager.js"

export let battingTeam, bowlingTeam, onStrike, nonStrike, bowler, game

export function initScoreBoard(g) {
    game = g
    battingTeam = game.innings[game.ci].battingTeam
    bowlingTeam = game.innings[game.ci].bowlingTeam

    onStrike = battingTeam.players[0]
    nonStrike = battingTeam.players[1]

    bowler = bowlingTeam.players[0]
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