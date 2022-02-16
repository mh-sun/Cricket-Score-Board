import {Team} from "./Team.js";
import {Game} from "./Game.js";

export function getGames(){
    let g = JSON.parse(localStorage.getItem('games')), games = []
    if(g === null || g.length === 0) return []
    else {
        g.forEach(game=>{
            games.push(new Game().initLS(game))
        })
    }
    return games
}
export function getTeamsFromLS(){
    let t = JSON.parse(localStorage.getItem('teams')), teams = []
    if(t === null || t.length === 0) return []
    else {
        t.forEach(team=>{
            teams.push(new Team().initLS(team))
        })
    }
    return teams
}
export function getTeam(name){
    let teams =  JSON.parse(localStorage.getItem('teams')), team
    if(teams === null) return null
    teams.forEach(t=>{
        if(t.name === name) team = new Team().initLS(t)
    })
    return team === undefined ? null : team
}
export function setTeamToLS(team) {
    let teams =  JSON.parse(localStorage.getItem('teams')), flag = false
    if(teams === null) teams = []
    for(let i =0; i< teams.length; i++){
        if(teams[i].name === team.name){
            teams[i] = team
            flag = true
            break
        }
    }
    if(!flag) teams.push(team)
    localStorage.setItem('teams', JSON.stringify(teams))
}
export function setTeamsToLS(teams) {
    localStorage.setItem('teams', JSON.stringify(teams))
}
export function setGamesToLS(games) {
    localStorage.setItem('games', JSON.stringify(games))
}

