import {getRandGame} from "./GetRandom.js";
import {Innings, InningsLS} from "./Innings.js";
import {TeamLS} from "./Team.js";

export function Game (bat, bowl, tossWon, opt, over){
    this.id = getRandGame()
    this.over = over
    // this.teamOne = bat
    // this.teamTwo = bowl
    this.tossWon = tossWon
    this.winner = ''
    this.opt = opt
    this.innings = [new Innings(bat, bowl), new Innings(bowl, bat)]
    this.ci = 0

    function getTime() {
        let d = new Date()
        return d.toLocaleDateString() + ' - ' + d.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })
    }

    this.time = getTime()
    this.getTeams = ()=>{
        return [this.innings[this.ci].battingTeam, this.innings[this.ci].bowlingTeam]
    }
}

export function GameLS(game){
    this.id = game.id
    this.over = game.over
    this.winner = game.winner
    this.tossWon = game.tossWon
    this.opt = game.opt
    // console.log(game.innings)
    this.innings = [new InningsLS(game.innings[0]), new InningsLS(game.innings[1])]
    this.ci = 0
    this.time = game.time
    this.getTeams = ()=>{
        return [this.innings[this.ci].battingTeam, this.innings[this.ci].bowlingTeam]
    }
}