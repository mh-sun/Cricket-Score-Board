export function innings(bat, bowl) {
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
}