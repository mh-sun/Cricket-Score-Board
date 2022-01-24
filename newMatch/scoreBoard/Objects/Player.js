export function player(name, role) {
    this.name = name
    this.battingRole = role instanceof Batsman ? role : null
    this.bowlingRole = role instanceof Bowler ? role : null
}
export function Bowler(){

    this.balls = 0
    this.maidens = 0
    this.runs = 0
    this.wickets = 0
    this.dots = 0

    this.getEconomy = function (){
        return (this.runs/this.balls).toPrecision(3)
    }
}
export function Batsman (){
    this.runs = 0
    this.balls = 0
    this.fours = 0
    this.sixes = 0
    this.outStatus = false

    this.getStrikeRate = function (){
        return (this.runs/this.balls*100).toPrecision(3)
    }
}