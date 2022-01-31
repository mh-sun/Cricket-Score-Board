import {nonStrike, onStrike} from "../Calc.js";

export function partnership() {
    this.playerOne = onStrike.name
    this.playerOneRun = 0
    this.playerTwo = nonStrike.name
    this.playerTwoRun = 0
    this.extras = 0
    this.runs = 0
    this.balls = 0

    this.updatePInfo = (r, b , s)=>{

        if(s === 'N'){
            if(onStrike.name === this.playerOne) this.playerOneRun += r
            else this.playerTwoRun += r
        }
        else if (s === 'W'){
            this.extras += r + 1
        }
        else if (s === 'NB'){
            this.extras += 1
            if(onStrike.name === this.playerOne) this.playerOneRun += r
            else this.playerTwoRun += r
        }
        else if (s === 'B' || s === 'LB'){
            this.extras += r
        }

        this.runs = this.playerOneRun + this.playerTwoRun + this.extras
        this.balls = this.balls + b
    }

}