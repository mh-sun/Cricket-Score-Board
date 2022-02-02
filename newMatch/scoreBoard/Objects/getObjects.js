import {Game} from "./Game.js";
import {Team} from "./Team.js";
import {Innings} from "./Innings.js";
import {Player} from "./Player.js";
import {partnership} from "./partnership.js";

export function getPlayer(player){
    return new Player(player.id, player.name)
}
export function getTeam(team){
    return new Team(team.id, team.name, team.players)
}
export function getInnings(innings){
    return new Innings(innings.battingTeam, innings.bowlingTeam)
}
export function getGame(game){
    console.log(game)
    return new Game(game.id, getTeam(game.innings[game.ci].battingTeam), getTeam(game.innings[game.ci].bowlingTeam), game.over)
}
export function getPartnership(pr){
    return new partnership(pr.id, getPlayer(pr.playerOne), getPlayer(pr.playerTwo))
}

