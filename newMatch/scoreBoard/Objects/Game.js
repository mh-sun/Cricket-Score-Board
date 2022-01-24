export function Game (team1, team2){
    this.innings = [new Innings(team1, team2), new Innings(team2, team1)]
    this.currentInnings = 0
}