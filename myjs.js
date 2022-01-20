let host_team_name, visitor_team_name ;
let team_won;
let opt_to;
let over;


let func1 = function (){
    host_team_name = document.getElementById('hostName').value
    visitor_team_name = document.getElementById('visitorName').value
    team_won = document.querySelector('input[name="team_won"]:checked')? document.querySelector('input[name="team_won"]:checked').value : null
    team_won = team_won === 'host_team'? host_team_name : visitor_team_name
    opt_to = document.querySelector('input[name="opt_to"]:checked')? document.querySelector('input[name="opt_to"]:checked').value : null
    over = document.getElementById('match_over').value
    over = Number(over)


    localStorage.setItem('host_team_name', host_team_name)
    localStorage.setItem('visitor_team_name', visitor_team_name)
    localStorage.setItem('team_won', team_won)
    localStorage.setItem('opt_to', opt_to)
    localStorage.setItem('over', over)

    let all_info = [host_team_name, visitor_team_name, team_won, opt_to, over]
    let temp = ['Host Team Name', 'Visitor Team Name', 'Toss winner', 'Opt', 'Match Over']

    for(let i =0;i<all_info.length;i++){
        console.log(all_info[i], i)
        if(all_info[i] === null || all_info[i] === undefined || all_info[i] === '' || all_info[i] <= 0){
            alert(temp[i] + " Not Provided")
            return
        }
    }

    window.location.href = 'selectOpeningPlayer.html'
}
