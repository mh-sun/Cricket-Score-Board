import * as scoreBoard from './scoreBoard.js'
import * as exManager from "./checkBoxManager.js"
import {addNewBowler} from "./newBowler.js";

export let battingTeam, bowlingTeam, onStrike, nonStrike, bowler, game

export function initScoreBoard(g) {
    game = g
    battingTeam = game.innings[game.ci].battingTeam
    bowlingTeam = game.innings[game.ci].bowlingTeam

    function getPlayer(id) {
        let p
        game.innings[game.ci].battingTeam.players.forEach(e=>{
            if(e.id === id) p=e
        })
        game.innings[game.ci].bowlingTeam.players.forEach(e=>{
            if(e.id === id) p=e
        })
        return p
    }

    onStrike = getPlayer(game.innings[game.ci].onStrike.id)
    nonStrike = getPlayer(game.innings[game.ci].nonStrike.id)
    bowler = getPlayer(game.innings[game.ci].bowler.id)
}

export function setBowler(b){
    bowler = b
    game.innings[game.ci].setCurrPlayer(onStrike, nonStrike, b)
}

export function setPlayer(onS, nonS){
    onStrike = onS
    nonStrike = nonS
    game.innings[game.ci].setCurrPlayer(onS, nonS, bowler)
}

function newBowlerAdd() {
     addNewBowler()
}

function setValues(x) {
    exManager.init()
    exManager.update(x)
    if(x%2 !== 0) swapBatsman()
    if((bowler.bowlingRole.overs_details.length - bowler.bowlingRole.extra) === 6 && bowler.bowlingRole.overs_details.length !== 0){
        swapBatsman()
        newBowlerAdd()
    }
    else scoreBoard.updateScoreBoard()
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
    },
    '1':function () {
        setValues(1)
    },
    '2':function () {
        setValues(2)
    },
    '3':function () {
        setValues(3)
    },
    '4':function () {
        setValues(4)
    },
    '5':function () {
        setValues(5)
    },
    '6':function () {
        setValues(6)
    },
}