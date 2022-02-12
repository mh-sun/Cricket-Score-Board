import {getRandGame} from "./GetRandom.js";
import {Innings} from "./Innings.js";

export function Game (bat, bowl, tossWon, opt, over){
    function getTime() {
        let d = new Date()
        return d.toLocaleDateString() + ' - ' + d.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })
    }

    this.id = getRandGame()
    this.over = over
    this.tossWon = tossWon
    this.opt = opt
    this.innings = [new Innings(bat, bowl), new Innings(bowl, bat)]
    this.ci = 0
    this.result = {
        isEnd: false,
        isDraw : false,
        winner : '',
        loser : '',
    }
    this.time = getTime()

    this.initLS = function (game){
        this.id = game.id
        this.over = game.over
        this.tossWon = game.tossWon
        this.opt = game.opt
        this.innings = [new Innings().initLS(game.innings[0]), new Innings().initLS(game.innings[1])]
        this.ci = 0
        this.time = game.time
        this.result = {
            isEnd: game.result.isEnd,
            isDraw : game.result.isDraw,
            winner : game.result.winner,
            loser : game.result.loser,
        }

        return this
    }
}
//
// export function GameLS(game){
//     this.id = game.id
//     this.over = game.over
//     this.tossWon = game.tossWon
//     this.opt = game.opt
//     this.innings = [new Innings().initLS(game.innings[0]), new Innings().initLS(game.innings[1])]
//     this.ci = 0
//     this.time = game.time
//     this.getTeams = ()=>{
//         return [this.innings[this.ci].battingTeam, this.innings[this.ci].bowlingTeam]
//     }
// }