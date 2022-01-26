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
        // console.log(this.runs, this.balls)
        return (this.runs/this.balls*6).toPrecision(3)
    }

    this.overs = function () {
        return Math.floor(this.balls/6) + '.' + this.balls%6
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

    this.setRun = function (run){
        this.runs += run
        if(run === 4) this.fours++
        else if(run === 6) this.sixes++
    }
}