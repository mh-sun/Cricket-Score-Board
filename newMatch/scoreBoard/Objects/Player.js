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
    this.extra = 0
    this.overs_details = []

    this.getEconomy = function (){
        return (this.runs/this.balls*6).toPrecision(3)
    }

    this.getOver = function () {
        return Math.floor(this.balls/6) + '.' + this.balls%6
    }

    function isMaiden(par) {
        if(par.overs_details.length !== 6) return false

        for(let i =0; i< par.overs_details.length; i++){
            if(par.overs_details[i] !== 0){
                return false
            }
        }
        return true
    }

    this.updateInfo = function (run, ball){
        if (ball === 0){
            this.extra ++
        }
        this.runs += run
        this.balls += ball
        if((this.overs_details.length - this.extra) < 6) this.overs_details.push(run)
        else this.overs_details = [run]

        if(isMaiden(this)) this.maidens++

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

    this.updateInfo = function (run, ball){
        this.runs += run
        this.balls += ball
        if(run === 4) this.fours++
        else if(run === 6) this.sixes++
    }
}