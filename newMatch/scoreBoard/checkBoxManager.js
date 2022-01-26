import {extras} from "./scoreBoard.js";
import {Innings} from "./Objects/Innings.js";
import * as cal from "./Calc.js"

export let wide, noBall, byes, legByes, wicket

export function init() {
    wide = document.getElementById(extras[0])
    noBall = document.getElementById(extras[1])
    byes = document.getElementById(extras[2])
    legByes = document.getElementById(extras[3])
    wicket = document.getElementById(extras[4])

    // console.log(wide.checked, noBall, byes, legByes, wicket)

}

export function update(x) {
    if(wicket.checked){

    }
    else {
        if(wide.checked || noBall.checked){
            cal.onStrike.battingRole.updateInfo(x+1, 0)
            cal.bowler.bowlingRole.updateInfo(x+1, 0)
        }
        // else if(byes.checked || legByes.checked){
        //     cal.onStrike.battingRole.updateInfo(x+1, 1)
        //     cal.bowler.bowlingRole.updateInfo(x+1, 1)
        // }
        else {
            cal.onStrike.battingRole.updateInfo(x, 1)
            cal.bowler.bowlingRole.updateInfo(x, 1)
        }
    }
}
