export function Innings(team1, team2){
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