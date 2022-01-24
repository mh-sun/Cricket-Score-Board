export function Team(name) {

    this.name = name
    this.players = []

    this.getTotalRuns = function (){
        let sum = 0;
        for(let i =0 ; i < this.players.length; i++){
            if(this.players[i].battingRole != null)
                sum += this.players[i].battingRole.runs
        }
        return sum
    }

    this.getCRR = function (){

    }

}