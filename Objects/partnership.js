import {getRandPartnership} from "./GetRandom.js";

export function Partnership(player1, player2) {
    this.id = getRandPartnership()
    this.playerOne = player1
    this.playerTwo = player2
    this.playerOneRun = 0
    this.playerTwoRun = 0
    this.extras = 0
    this.runs = 0
    this.balls = 0

    this.updatePInfo = (r, b , s, batsman)=>{
        if(s === 'N' || s === '-N'){
            if(batsman === this.playerOne) this.playerOneRun += r
            else this.playerTwoRun += r
        }
        else if (s === 'WD' || s === '-WD'){
            this.extras = s === 'WD' ? this.extras + r + 1 : this.extras + r - 1
        }
        else if (s === 'NB' ||  s === '-NB'){
            this.extras = s === 'NB' ? this.extras + 1 : this.extras - 1
            if(batsman === this.playerOne) this.playerOneRun += r
            else this.playerTwoRun += r
        }
        else if (s === 'B' || s === 'LB' || s === '-B' || s === '-LB'){
            this.extras += r
        }
        this.runs = this.playerOneRun + this.playerTwoRun + this.extras
        this.balls = this.balls + b
    }

}
export function PartnershipLS(partnership) {
    this.id = partnership.id
    this.playerOne = partnership.playerOne
    this.playerTwo = partnership.playerTwo
    this.playerOneRun = partnership.playerOneRun
    this.playerTwoRun = partnership.playerTwoRun
    this.extras = partnership.extras
    this.runs = partnership.runs
    this.balls = partnership.balls

    this.updatePInfo = (r, b , s, batsman)=>{
        if(s === 'N' || s === '-N'){
            if(batsman === this.playerOne) this.playerOneRun += r
            else this.playerTwoRun += r
        }
        else if (s === 'WD' || s === '-WD'){
            this.extras = s === 'WD' ? this.extras + r + 1 : this.extras + r - 1
        }
        else if (s === 'NB' ||  s === '-NB'){
            this.extras = s === 'NB' ? this.extras + 1 : this.extras - 1
            if(batsman === this.playerOne) this.playerOneRun += r
            else this.playerTwoRun += r
        }
        else if (s === 'B' || s === 'LB' || s === '-B' || s === '-LB'){
            this.extras += r
        }
        this.runs = this.playerOneRun + this.playerTwoRun + this.extras
        this.balls = this.balls + b
    }
}