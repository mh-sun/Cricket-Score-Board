import {bowler, game, nonStrike, onStrike} from "./Calc.js";

export function undo() {

}

export function getPartnership() {
    // console.log(onStrike.name+' ('+onStrike.battingRole.runs+') \n'
    // +'---'+(onStrike.battingRole.runs+onStrike.battingRole.runs)+'---'+(onStrike.battingRole.balls+nonStrike.battingRole.balls)+'---\n'
    // +)
}

export function getExtraRun() {
    let innings = game.innings[game.currentInnings]
    console.log('Extras: '+ innings.bye+ ' B,'
    +innings.legBye + ' LB,'
    +innings.wide + ' WD,'
    +innings.noBall + ' NB,'
    +innings.penalty + ' P')
}