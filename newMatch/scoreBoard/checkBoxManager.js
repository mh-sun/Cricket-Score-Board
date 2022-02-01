import {extras} from "./scoreBoard.js";
import {Innings} from "./Objects/Innings.js";
import * as cal from "./Calc.js"
import {game} from "./Calc.js";
import {getPartnership} from "./Objects/getObjects.js";

export let wide, noBall, byes, legByes, wicket

export function init() {
    wide = document.getElementById(extras[0])
    noBall = document.getElementById(extras[1])
    byes = document.getElementById(extras[2])
    legByes = document.getElementById(extras[3])
    wicket = document.getElementById(extras[4])

}

export function update(x) {

    let flag = true
    let t = game.innings[game.ci].partnerships
    t = getPartnership(t[t.length-1])
    if(wicket.checked){
        flag = false

        cal.onStrike.battingRole.updateInfo(0,1)
        cal.bowler.bowlingRole.updateInfo(x,1, 'W')

        // game.innings[game.ci].totalWickets ++
    }
    if(noBall.checked ){
        flag = false

        cal.onStrike.battingRole.updateInfo(x, 1)
        cal.bowler.bowlingRole.updateInfo(x+1, 0, 'NB')
        t.updatePInfo(x, 0, 'NB')

        game.innings[game.ci].noBall ++
    }
    else if(wide.checked){
        flag = false

        cal.bowler.bowlingRole.updateInfo(x+1,0, 'WD')

        t.updatePInfo(x, 0, 'W')
        game.innings[game.ci].wide += x+1
    }
    if(byes.checked ){
        flag = false

        cal.onStrike.battingRole.updateInfo(0, 1)
        cal.bowler.bowlingRole.updateInfo(0, 1, 'B')

        t.updatePInfo(x, 1, 'B')
        game.innings[game.ci].bye ++
    }
    else if(legByes.checked){
        flag = false

        cal.onStrike.battingRole.updateInfo(0, 1)
        cal.bowler.bowlingRole.updateInfo(0, 1, 'B')

        t.updatePInfo(x, 1, 'LB')
        game.innings[game.ci].legBye ++
    }

    if(flag){
        cal.onStrike.battingRole.updateInfo(x,1)
        cal.bowler.bowlingRole.updateInfo(x,1, 'N')

        t.updatePInfo(x, 1, 'N', cal.onStrike)
    }
}
