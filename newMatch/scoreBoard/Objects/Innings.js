import {Partnership, PartnershipLS} from "./partnership.js";
import {TeamLS} from "./Team.js";
import {Player, PlayerLS} from "./Player.js";

export function Innings(bat, bowl){
    this.battingTeam = bat
    this.bowlingTeam = bowl
    this.onStrike = new Player()
    this.nonStrike = new Player()
    this.bowler = new Player()
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
}

export function InningsLS(innings){
    this.battingTeam = new TeamLS(innings.battingTeam)
    this.bowlingTeam = new TeamLS(innings.bowlingTeam)
    this.onStrike = new PlayerLS(innings.onStrike)
    this.nonStrike = new PlayerLS(innings.nonStrike)
    this.bowler = new PlayerLS(innings.bowler)
    this.extra = innings.extra
    this.states = innings.states

    function getPartnerships(prs) {
        let tempPr = []
        prs.forEach(p=>{
            tempPr.push(new PartnershipLS(p))
        })
        return tempPr
    }
    this.partnerships = getPartnerships(innings.partnerships)

    function setPartnerShip(bat1, bat2) {
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
}