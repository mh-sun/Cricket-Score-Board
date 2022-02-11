import {Partnership} from "./partnership.js";
import {Team} from "./Team.js";

export function Innings(bat, bowl){
    this.battingTeam = bat
    this.bowlingTeam = bowl
    this.onStrike = ''
    this.nonStrike = ''
    this.bowler = ''
    this.extra = {
        noBall : 0,
        wide : 0,
        bye : 0,
        legBye : 0,
        penalty : 0,
    }
    this.partnerships = []
    this.states = []

    this.setPartnerShip = function(bat1, bat2) {
        this.partnerships.push(new Partnership(bat1, bat2))
    }

    this.setStates = function(state) {
        this.states.push(state)
    }

    this.setCurrPlayer = function(s, ns, b){
        this.onStrike = s
        this.nonStrike = ns
        this.bowler = b
    }

    this.getExtras = ()=>{
        return this.extra.noBall + this.extra.wide + this.extra.bye + this.extra.legBye + this.extra.penalty
    }

    this.initLS = function (innings) {
        function getPartnerships(prs) {
            let tempPr = []
            prs.forEach(p=>{
                tempPr.push(new Partnership().initLS(p))
            })
            return tempPr
        }

        this.battingTeam = new Team().initLS(innings.battingTeam)
        this.bowlingTeam = new Team().initLS(innings.bowlingTeam)
        this.onStrike = innings.onStrike
        this.nonStrike = innings.nonStrike
        this.bowler = innings.bowler
        this.extra = {
            noBall : innings.extra.noBall,
            wide : innings.extra.wide,
            bye : innings.extra.bye,
            legBye : innings.extra.legBye,
            penalty : innings.extra.penalty,
        }
        this.partnerships = getPartnerships(innings.partnerships)
        this.states = innings.states

        return this
    }
}

// export function InningsLS(innings){
//     this.battingTeam = new Team().initLS(innings.battingTeam)
//     this.bowlingTeam = new Team().initLS(innings.bowlingTeam)
//     this.onStrike = new Player().initLS(innings.onStrike)
//     this.nonStrike = new Player().initLS(innings.nonStrike)
//     this.bowler = new Player().initLS(innings.bowler)
//     this.extra = innings.extra
//     this.states = innings.states
//
//     function getPartnerships(prs) {
//         let tempPr = []
//         prs.forEach(p=>{
//             tempPr.push(new PartnershipLS(p))
//         })
//         return tempPr
//     }
//     this.partnerships = getPartnerships(innings.partnerships)
//
//     this.setPartnerShip = function (bat1, bat2) {
//         this.partnerships.push(new Partnership(bat1, bat2))
//     }
//
//     this.setStates = function(state) {
//         this.states.push(state)
//     }
//
//     this.setCurrPlayer = function(s, ns, b){
//         this.onStrike = s
//         this.nonStrike = ns
//         this.bowler = b
//     }
//
//     this.getExtras = ()=>{
//         return this.extra.noBall + this.extra.wide + this.extra.bye + this.extra.legBye + this.extra.penalty
//     }
// }