const host_team_name = localStorage.getItem('host_team_name')
const visitor_team_name = localStorage.getItem('visitor_team_name')
const toss_won = localStorage.getItem('team_won')
const opt_to = localStorage.getItem('opt_to')
const over = Number(localStorage.getItem('over'))
let setBattingnBowlingTeam =function (seek){
    let battingTeam, bowlingTeam
    if(toss_won === host_team_name){
        if(opt_to === 'opt_bat'){
            battingTeam = host_team_name
            bowlingTeam = visitor_team_name
        }
        else {
            battingTeam = visitor_team_name
            bowlingTeam = host_team_name
        }
    }
    else {
        if(opt_to === 'opt_bat'){
            battingTeam = visitor_team_name
            bowlingTeam = host_team_name
        }
        else {
            battingTeam = host_team_name
            bowlingTeam = visitor_team_name
        }
    }
    battingTeam = new Team(battingTeam)
    bowlingTeam = new Team(bowlingTeam)
    return seek === 'bat' ? battingTeam : seek === 'bowl' ? bowlingTeam : null
}

let onStrike = new Player(localStorage.getItem('striker'), new Batsman())
let nonStrike = new Player(localStorage.getItem('non_striker'), new Batsman())
let battingTeam = setBattingnBowlingTeam('bat')
battingTeam.players.push(onStrike,nonStrike)

let bowler = new Player(localStorage.getItem('bowler'), new Bowler())
let bowlingTeam = setBattingnBowlingTeam('bowl')
bowlingTeam.players.push(bowler)

const game = new Game(battingTeam, bowlingTeam)
console.log(game)
let updateInfo = function (run){

    onStrike.battingRole.runs += run

    document.getElementById('battingTeam').innerText = battingTeam.name
    document.getElementById('total_run').innerText = game.innings[game.currentInnings].getTotalRuns(battingTeam)
    document.getElementById('total_wicket').innerText = game.innings[game.currentInnings].getTotalWicket(battingTeam)
    document.getElementById('runningOver').innerText = getOver()
    document.getElementById('runrate').innerText = getCurrentRunRate()
}
// updateInfo(1)