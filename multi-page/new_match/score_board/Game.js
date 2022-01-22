class Game {
    constructor(team1, team2) {
        this.innings = [new Innings(team1, team2), new Innings(team2, team1)]
        this.currentInnings = 0
    }
}
class Innings{
    constructor(team1, team2) {
        this.battingTeam = team1
        this.bowlingTeam = team2
        this.totalRuns = 0
        this.thisOver = []
        this.totalWickets = 0
        this.totalBalls = 0

        this.noBall = 0
        this.wide = 0
        this.bye = 0
        this.legBye = 0
        this.penalty = 0

        this.onStrike = 0
        this.nonStrie = 1
        this.bowling = 0
    }

}
class Team {
    constructor(name) {
        this.name = name
        this.players = []
    }

    getTotalRuns(){
        let sum = 0;
        for(let i =0 ; i < this.players.length; i++){
            // sum += this.players[i].battingRole.runs
            console.log(this.players[i].battingRole.runs)

        }
        return sum
    }

    getCRR(){

    }

    getTotalWicket(){

    }

}
class Player {
    constructor(name, role) {
        this.name = name
        this.outStatus = false
        this.battingRole = role instanceof Batsman ? role : null
        this.bowlingRole = role instanceof Bowler ? role : null
    }
}
class Bowler{
    constructor() {
        this.balls = 0
        this.maidens = 0
        this.runs = 0
        this.wickets = 0
        this.dots = 0
    }
    getEconomy(){
        return (this.runs/this.balls).toPrecision(3)
    }
}
class Batsman {
    constructor() {
        this.runs = 0
        this.balls = 0
        this.fours = 0
        this.sixes = 0
    }
    getStrikeRate(){
        return (this.runs/this.balls*100).toPrecision(3)
    }
}