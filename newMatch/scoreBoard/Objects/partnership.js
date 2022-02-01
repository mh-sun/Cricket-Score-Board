
export function partnership(prID, player1, player2) {
    this.id = prID
    this.playerOne = player1
    this.playerTwo = player2
    this.playerOneRun = 0
    this.playerTwoRun = 0
    this.extras = 0
    this.runs = 0
    this.balls = 0

    this.updatePInfo = (r, b , s, batsman)=>{
        if(s === 'N'){
            if(batsman === this.playerOne) this.playerOneRun += r
            else this.playerTwoRun += r
        }
        else if (s === 'W'){
            this.extras += r + 1
        }
        else if (s === 'NB'){
            this.extras += 1
            if(batsman === this.playerOne) this.playerOneRun += r
            else this.playerTwoRun += r
        }
        else if (s === 'B' || s === 'LB'){
            this.extras += r
        }

        this.runs = this.playerOneRun + this.playerTwoRun + this.extras
        this.balls = this.balls + b
    }

}