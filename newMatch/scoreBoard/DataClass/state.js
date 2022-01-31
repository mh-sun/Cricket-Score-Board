export function state(sid, striker, bowler, nonStriker, run, ...extras){
    this.id = sid
    this.striker = striker
    this.bowler = bowler
    this.nonStriker = nonStriker
    this.run = run
    this.extras = []
    extras.forEach(e=>this.extras.push(e))
}