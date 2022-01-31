export function player(pid, name){
    this.id = pid
    this.name = name
    this.bowlingRole = {
        balls: 0,
        maidens: 0,
        runs: 0,
        wickets: 0,
        extra: 0,
        overs_details: [],
    }
    this.battingRole = {
        runs : 0,
        balls : 0,
        fours : 0,
        sixes : 0,
        outStatus : false,
    }
}
