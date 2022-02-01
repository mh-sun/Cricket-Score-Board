export function Innings(bat, bowl){
    this.battingTeam = bat
    this.bowlingTeam = bowl
    this.onStrike = ''
    this.nonStrike = ''
    this.bowler = ''
    this.extra = {
        noBall : 0,
        wide : 0,
        bye : 0,
        legBye : 0,
        penalty : 0,
    }

    this.partnerships = []

    this.getExtras = ()=>{
        return this.extra.noBall + this.extra.wide + this.extra.bye + this.extra.legBye + this.extra.penalty
    }

}