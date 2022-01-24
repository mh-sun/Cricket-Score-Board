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
    return seek === 'bat' ? battingTeam : seek === 'bowl' ? bowlingTeam : null
}

let battingTeam = setBattingnBowlingTeam('bat')
let bowlingTeam = setBattingnBowlingTeam('bowl')

export {battingTeam, bowlingTeam}