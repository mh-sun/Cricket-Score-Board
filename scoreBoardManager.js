let host_team_name = localStorage.getItem('host_team_name')
let visitor_team_name= localStorage.getItem('visitor_team_name') ;
let toss_won = localStorage.getItem('team_won');
let toss_lost = toss_won === host_team_name? visitor_team_name: host_team_name
let opt_to= localStorage.getItem('opt_to');
let over= Number(localStorage.getItem('over'));
let striker= localStorage.getItem('striker'), non_striker= localStorage.getItem('non_striker'), bowler= localStorage.getItem('bowler');

let OverRuns = []

let battingTeam = opt_to === 'opt_bat'? toss_won : toss_lost
let bowlingTeam = battingTeam === host_team_name ? visitor_team_name : host_team_name

const hostTeam = {
    name : host_team_name,
    batsmanList: [],
    bowlerList: [],
    scoredRun: 0,
    playedBowl: 0,
    wickets: 0
}

const visitingTeam = {
    name : visitor_team_name,
    batsmanList: [],
    bowlerList: [],
    scoredRun: 0,
    playedBowl: 0,
    wickets: 0
}

let getCurrentRunRate = function (){
    let tr = battingTeam === hostTeam.name ? hostTeam.scoredRun : visitingTeam.scoredRun
    let to = battingTeam === hostTeam.name ? hostTeam.playedBowl : visitingTeam.playedBowl

    return  (tr/to * 6).toPrecision(2);
}

let getRun = function (){
    let run =  battingTeam === hostTeam.name ? hostTeam.scoredRun : visitingTeam.scoredRun
    return run
}

let getWicket = function (){
    let w = battingTeam === hostTeam.name ? hostTeam.wickets : visitingTeam.wickets
    return w
}

let getOver = function (){
    let b = battingTeam === hostTeam.name ? hostTeam.playedBowl : visitingTeam.playedBowl

    let o = Math.floor(b/6)+ "." + (b%6)
    return o
}

let updateInfo = function (run){

    if(battingTeam === hostTeam.name){
        hostTeam.scoredRun += run
        hostTeam.playedBowl += 1
    }
    else {
        visitingTeam.scoredRun += run
        visitingTeam.playedBowl += 1
    }

    console.log(hostTeam,visitingTeam)
    document.getElementById('battingTeam').innerText = battingTeam
    document.getElementById('total_run').innerText = getRun()
    document.getElementById('total_wicket').innerText = getWicket()
    document.getElementById('runningOver').innerText = getOver()
    document.getElementById('runrate').innerText = getCurrentRunRate()
}

document.getElementById('battingTeam').innerText = battingTeam