import {getRandPlayer} from "./GetRandom.js";

export function Player(name = '') {
    this.id = getRandPlayer()
    this.name = name
    this.image = ''
    this.battingRole = {
        runs : 0,
        balls : 0,
        fours : 0,
        sixes : 0,
        outInfo : {
            isOut: false,
            bowler : '',
            type : '',
            helped : ''
        },
        isPlaying : false,

        getStrikeRate : function (){
            let ans = (this.runs/this.balls*100).toPrecision(3)
            return (!isNaN(ans) && isFinite(ans))? ans : 0
        },

        updateInfo : function (run, ball){
            this.runs += run
            this.balls += ball
            if(run === 4) this.fours++
            else if(run === 6) this.sixes++
            else if(run === -4) this.fours--
            else if(run === -6) this.sixes--
        },
        undoInfo: function (state){
            let run = state.run
            this.runs -= run
            this.balls -= state.extras.includes('NB') ? 0 : 1
            if(run === 4) this.fours--
            else if(run === 6) this.sixes--
        }
    }
    this.bowlingRole = {
        balls : 0,
        maidens : 0,
        runs : 0,
        wickets : 0,
        // extra : 0,
        wides : 0,
        noBalls : 0,
        dotBalls : 0,
        isPlaying : false,
        overs_details : [],

        getEconomy : function (){
            let ans = (this.runs/this.balls*6).toPrecision(3)
            return (!isNaN(ans) && isFinite(ans))? ans : 0
        },

        getOver : function () {
            return Math.floor(this.balls/6) + '.' + this.balls%6
        },

        isMaiden : function (par) {
            if(par.overs_details.length < 6) return false

            for(let i =0; i< par.overs_details.length; i++){
                if(par.overs_details[i].extras.run !== 0
                    || par.overs_details[i].extras.includes('WD')
                    || par.overs_details[i].extras.includes('NB')
                ){
                    return false
                }
            }
            return true
        },

        updateInfo : function (run, ball, state) {
            let s = state.extras[0]
            if (s !== 'N') {
                if(s === 'WD') this.wides++
                else if(s === 'NB') this.noBalls++
                else if (s === 'W') this.wickets++
            }

            if(run === 0 && ball === 1) this.dotBalls++

            this.runs += run
            this.balls += ball

            function isOverCompleted(par) {
                let sum = 0
                par.overs_details.forEach(each => {
                    if (
                        (!each.extras.includes('NB'))
                        && (!each.extras.includes('WD'))
                    ) sum++
                })
                console.log(par.overs_details.map(p=>p.extras), sum)
                return sum
            }

            if (isOverCompleted(this) < 6) this.overs_details.push(state)
            else this.overs_details = [state]

            if (this.isMaiden(this) && isOverCompleted(this) === 6) this.maidens++
        },

        undoInfo: function (state){
            if (!state.extras.includes('N')) {
                if(state.extras.includes('WD')) this.wides--

                if (state.extras.includes('NB')) this.noBalls--

                if (state.extras.includes('W')) this.wickets--
            }

            if(state.run === 0 && state.extras.includes('N')) this.dotBalls--

            let flag = true
            let bowlRun, bowlBall
            let x = state.run
            if(state.extras.includes('W')){
                flag = false
                bowlRun = x
                bowlBall = 1
            }
            if(state.extras.includes('NB')){
                flag = false
                bowlRun = x+1
                bowlBall = 0
            }
            else if(state.extras.includes('WD')){
                flag = false
                bowlRun = x+1
                bowlBall = 0
            }
            if(state.extras.includes('B')){
                flag = false
                if(state.extras.includes('NB')){
                    bowlRun = x+1
                    bowlBall = 0
                }
                else {
                    bowlRun = 0
                    bowlBall = 1
                }
            }
            else if(state.extras.includes('LB')){
                flag = false
                if(state.extras.includes('NB')){
                    bowlRun = x+1
                    bowlBall = 0
                }
                else {
                    bowlRun = 0
                    bowlBall = 1
                }
            }
            if(flag){
                bowlRun = x
                bowlBall = 1
            }

            this.runs -= bowlRun
            this.balls -= bowlBall

            function isOverCompleted(par) {
                let sum = 0
                par.overs_details.forEach(each => {
                    if (each.extras.includes('N')) sum++
                })
                return sum
            }

            this.overs_details.pop()

            if(isOverCompleted(this) === 5
                && state.run === 0) this.maidens--
        }
    }
    this.fieldingRole = {
        matches: 0,
        catches: 0,
        stumpings: 0,
        runOuts: 0,
    }

    this.isBatsman = function (innings){
        // let flag = false
        // innings.battingTeam.players.forEach(p=>{
        //     if(p.name === this.name) flag = true
        // })
        // return flag
        return this.battingRole.isPlaying
    }
    this.isBowler = function (innings){
        // let flag = false
        // innings.bowlingTeam.players.forEach(p=>{
        //     if(p.name === this.name) flag = true
        // })
        // return flag
        return this.bowlingRole.isPlaying
    }
    this.initLS = function (player){
        this.id = player.id
        this.name = player.name
        this.image = player.image

        this.battingRole.runs = player.battingRole.runs
        this.battingRole.balls = player.battingRole.balls
        this.battingRole.fours = player.battingRole.fours
        this.battingRole.sixes = player.battingRole.sixes
        this.battingRole.outInfo.isOut = player.battingRole.outInfo.isOut
        this.battingRole.outInfo.bowler = player.battingRole.outInfo.bowler
        this.battingRole.outInfo.type = player.battingRole.outInfo.type
        this.battingRole.outInfo.helped = player.battingRole.outInfo.helped
        this.battingRole.isPlaying = player.battingRole.isPlaying

        this.bowlingRole.balls = player.bowlingRole.balls
        this.bowlingRole.maidens = player.bowlingRole.maidens
        this.bowlingRole.runs = player.bowlingRole.runs
        this.bowlingRole.wickets = player.bowlingRole.wickets
        this.bowlingRole.wides = player.bowlingRole.wides
        this.bowlingRole.noBalls = player.bowlingRole.noBalls
        this.bowlingRole.dotBalls = player.bowlingRole.dotBalls
        this.bowlingRole.isPlaying = player.bowlingRole.isPlaying
        this.bowlingRole.overs_details = player.bowlingRole.overs_details

        this.fieldingRole.matches = player.fieldingRole.matches
        this.fieldingRole.catches = player.fieldingRole.catches
        this.fieldingRole.stumpings = player.fieldingRole.stumpings
        this.fieldingRole.runOuts = player.fieldingRole.runOuts

        return this
    }
}
//
// export function PlayerLS(player) {
//     this.id = player.id
//     this.name = player.name
//     this.battingRole = {
//         runs : player.battingRole.runs,
//         balls : player.battingRole.balls,
//         fours : player.battingRole.fours,
//         sixes : player.battingRole.sixes,
//         outStatus : player.battingRole.outStatus,
//
//         getStrikeRate : function (){
//             let ans = (this.runs/this.balls*100).toPrecision(3)
//             return isNaN(ans)? 0 : ans
//         },
//
//         updateInfo : function (run, ball){
//             this.runs += run
//             this.balls += ball
//             if(run === 4) this.fours++
//             else if(run === 6) this.sixes++
//             else if(run === -4) this.fours--
//             else if(run === -6) this.sixes--
//         },
//     }
//
//     function getOverDetails(bRole) {
//         if(bRole.overs_details.length === 0 || bRole.overs_details === undefined)
//             bRole.overs_details = []
//         return bRole.overs_details
//     }
//
//     this.bowlingRole = {
//         balls : player.bowlingRole.balls,
//         maidens : player.bowlingRole.maidens,
//         runs : player.bowlingRole.runs,
//         wickets : player.bowlingRole.wickets,
//         extra : player.bowlingRole.extra,
//         overs_details : getOverDetails(player.bowlingRole),
//
//         getEconomy : function (){
//             let ans = (this.runs/this.balls*6).toPrecision(3)
//             return (!isNaN(ans) && isFinite(ans))? ans : 0
//         },
//
//         getOver : function () {
//             return Math.floor(this.balls/6) + '.' + this.balls%6
//         },
//
//         isMaiden : function (par) {
//             if(par.overs_details.length !== 6) return false
//
//             for(let i =0; i< par.overs_details.length; i++){
//                 if(par.overs_details[i][0] !== 0){
//                     return false
//                 }
//             }
//             return true
//         },
//
//         updateInfo : function (run, ball, s) {
//             let r = [run, s]
//             if (s !== 'N') {
//                 this.extra++
//                 if(s === '-N') this.extra--
//                 if (s === 'W') this.wickets++
//                 else if (s === '-W') this.wickets--
//             }
//
//             this.runs += run
//             this.balls += ball
//
//             function isOverCompleted(par) {
//                 let sum = 0
//                 par.overs_details.forEach(each => {
//                     if (each[1] === 'N') sum++
//                 })
//                 return sum
//             }
//             console.log(isOverCompleted(this) < 6 && !s.includes('-'))
//             if (isOverCompleted(this) < 6 && !s.includes('-')) this.overs_details.push(r)
//             else if (!s.includes('-'))this.overs_details = [r]
//             else if(s.includes('-')) this.overs_details.pop()
//
//             if (this.isMaiden(this) && isOverCompleted(this) === 6) this.maidens++
//             else if(isOverCompleted(this) === 5
//                 && s.includes('-')
//                 && run === 0) this.maidens--
//         }
//     }
//
//     this.isBatsman = function (innings){
//         let flag = false
//         innings.states.forEach(s=>{
//             if(s.striker === this.name) flag = true
//             else if(s.nonStriker === this.name) flag = true
//         })
//         return flag
//     }
//     this.isBowler = function (innings){
//         let flag = false
//         innings.states.forEach(s=>{
//             if(s.bowler === this.name) flag = true
//         })
//         return flag
//     }
// }