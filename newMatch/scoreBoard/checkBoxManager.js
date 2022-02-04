import {extras} from "./scoreBoard.js";
import * as cal from "./Calc.js"
import {game} from "./Calc.js";

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
    let partnership = t[t.length-1]
    if(wicket.checked){
        flag = false

        cal.onStrike.battingRole.updateInfo(0,1)
        cal.bowler.bowlingRole.updateInfo(x,1, 'W')
    }
    if(noBall.checked ){
        flag = false

        cal.onStrike.battingRole.updateInfo(x, 1)
        cal.bowler.bowlingRole.updateInfo(x+1, 0, 'NB')
        partnership.updatePInfo(x, 0, 'NB', cal.onStrike)

        game.innings[game.ci].extra.noBall ++
    }
    else if(wide.checked){
        flag = false

        cal.bowler.bowlingRole.updateInfo(x+1,0, 'WD')

        partnership.updatePInfo(x, 0, 'W', cal.onStrike)
        game.innings[game.ci].extra.wide += x+1
    }
    if(byes.checked ){
        flag = false

        cal.onStrike.battingRole.updateInfo(0, 1)
        cal.bowler.bowlingRole.updateInfo(0, 1, 'B')

        partnership.updatePInfo(x, 1, 'B', cal.onStrike)
        game.innings[game.ci].extra.bye ++
    }
    else if(legByes.checked){
        flag = false

        cal.onStrike.battingRole.updateInfo(0, 1)
        cal.bowler.bowlingRole.updateInfo(0, 1, 'B')

        partnership.updatePInfo(x, 1, 'LB', cal.onStrike)
        game.innings[game.ci].extra.legBye ++
    }

    if(flag){
        cal.onStrike.battingRole.updateInfo(x,1)
        cal.bowler.bowlingRole.updateInfo(x,1, 'N')
        partnership.updatePInfo(x, 1, 'N', cal.onStrike)
    }

    let games = JSON.parse(localStorage.getItem('games'))
    for(let i = 0; i< games.length; i++){
        if(games[i].id === game.id) {
            console.log('testing........')
            games[i] = game
        }
    }
    localStorage.setItem('games', JSON.stringify(games))
}
