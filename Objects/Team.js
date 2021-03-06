import {getRandTeam} from "./GetRandom.js";
import {Player} from "./Player.js";

export function Team(name, players = []){
    this.id = getRandTeam()
    this.name = name
    this.players = players

    this.getTotalRunsByBatsman = function(){
        let sum = 0;
        for(let i =0 ; i < this.players.length; i++){
            if(this.players[i].battingRole != null)
                sum += this.players[i].battingRole.runs
        }
        return sum
    }

    this.getTotalBallBatsmanFaced = function() {
        let sum = 0;
        for(let i =0 ; i < this.players.length; i++){
            if(this.players[i].battingRole != null)
                sum += this.players[i].battingRole.balls
        }
        return sum
    }

    this.getWickets = function() {
        let sum = 0;
        for(let i =0 ; i < this.players.length; i++){
            if(this.players[i].bowlingRole != null)
                sum += this.players[i].bowlingRole.wickets
        }
        return sum
    }

    this.getOvers = function() {
        let over = this.getTotalBallBatsmanFaced()
        return Math.floor(over/6) + '.' + over%6
    }

    this.getCRR = function(){
        let ans = (this.getTotalRunsByBatsman()/this.getTotalBallBatsmanFaced()*6)
        return isNaN(ans)? 0 : ans
    }

    this.initLS = function (team) {
        function getPlayers(team) {
            let temp = []
            team.players.forEach(p=>{
                temp.push(new Player().initLS(p))
            })
            return temp
        }

        this.id = team.id
        this.name = team.name
        this.players = getPlayers(team)

        return this
    }
}
//
// export function TeamLS(team) {
//     this.id = team.id
//     this.name = team.name
//
//     function getPlayers(players) {
//         let tempP = []
//         players.forEach(p=>{
//             tempP.push(new Player().initLS(p))
//         })
//         return tempP
//     }
//     this.players = getPlayers(team.players)
//
//     this.getTotalRunsByBatsman = function(){
//         let sum = 0;
//         for(let i =0 ; i < this.players.length; i++){
//             if(this.players[i].battingRole != null)
//                 sum += this.players[i].battingRole.runs
//         }
//         return sum
//     }
//
//     this.getTotalBallBatsmanFaced = function() {
//         let sum = 0;
//         for(let i =0 ; i < this.players.length; i++){
//             if(this.players[i].battingRole != null)
//                 sum += this.players[i].battingRole.balls
//         }
//         return sum
//     }
//
//     this.getWickets = function() {
//         let sum = 0;
//         for(let i =0 ; i < this.players.length; i++){
//             if(this.players[i].bowlingRole != null)
//                 sum += this.players[i].bowlingRole.wickets
//         }
//         return sum
//     }
//
//     this.getOvers = function() {
//         let over = this.getTotalBallBatsmanFaced()
//         return Math.floor(over/6) + '.' + over%6
//     }
//
//     this.getCRR = function(){
//         let ans = (this.getTotalRunsByBatsman()/this.getTotalBallBatsmanFaced()*6)
//         return isNaN(ans)? 0 : ans
//     }
// }
