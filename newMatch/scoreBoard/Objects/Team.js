export function Team(name) {

    this.name = name
    this.players = []

    this.getTotalRunsByBatsman = function (){
        let sum = 0;
        for(let i =0 ; i < this.players.length; i++){
            if(this.players[i].battingRole != null)
                sum += this.players[i].battingRole.runs
        }
        return sum
    }

    this.getTotalBallBatsmanFaced = function () {
        let sum = 0;
        for(let i =0 ; i < this.players.length; i++){
            if(this.players[i].battingRole != null)
                sum += this.players[i].battingRole.balls
        }
        return sum
    }

    this.getWickets = function () {
        let sum = 0;
        for(let i =0 ; i < this.players.length; i++){
            if(this.players[i].bowlingRole != null)
                sum += this.players[i].bowlingRole.wickets
        }
        return sum
    }

    this.getOvers = function () {
        let over = this.getTotalBallBatsmanFaced()
        return Math.floor(over/6) + '.' + over%6
    }

    this.getCRR = function (){
        let ans = (this.getTotalRunsByBatsman()/this.getTotalBallBatsmanFaced()*6)
        return isNaN(ans)? 0 : ans
    }

}
