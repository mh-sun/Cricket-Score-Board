export function Player(pid, name) {
    this.id = pid
    this.name = name
    this.battingRole = {
        runs : 0,
        balls : 0,
        fours : 0,
        sixes : 0,
        outStatus : false,

        getStrikeRate : function (){
            console.log('TESSSSSST111')
            let ans = (this.runs/this.balls*100).toPrecision(3)
            return isNaN(ans)? 0 : ans
        },

        updateInfo : function (run, ball){
            this.runs += run
            this.balls += ball
            if(run === 4) this.fours++
            else if(run === 6) this.sixes++
        },
    }
    this.bowlingRole = {
        balls : 0,
        maidens : 0,
        runs : 0,
        wickets : 0,
        extra : 0,
        overs_details : [],

        getEconomy : function (){
            let ans = (this.runs/this.balls*6).toPrecision(3)
            return isNaN(ans)? 0 : ans
        },

        getOver : function () {
            return Math.floor(this.balls/6) + '.' + this.balls%6
        },

        isMaiden : function (par) {
            if(par.overs_details.length !== 6) return false

            for(let i =0; i< par.overs_details.length; i++){
                if(par.overs_details[i][0] !== 0){
                    return false
                }
            }
            return true
        },

        updateInfo : function (run, ball, s) {
            let r = [run, s]
            if (s !== 'N') {
                this.extra++
                if (s === 'W') this.wickets++
            }

            this.runs += run
            this.balls += ball

            function isOverCompleted(par) {
                let sum = 0
                par.overs_details.forEach(each => {
                    if (each[1] === 'N') sum++
                })
                return sum
            }

            if (isOverCompleted(this) < 6) this.overs_details.push(r)
            else this.overs_details = [r]

            if (this.isMaiden(this)) this.maidens++
        }
    }
}