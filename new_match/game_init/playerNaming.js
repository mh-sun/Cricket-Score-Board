let striker, non_striker, bowler;


let func2 = function (){
    striker = document.getElementById('striker').value
    non_striker = document.getElementById('non_striker').value
    bowler = document.getElementById('bowler').value

    localStorage.setItem('striker', striker)
    localStorage.setItem('non_striker', non_striker)
    localStorage.setItem('bowler', bowler)

    let all_info = [striker, non_striker, bowler]
    let temp = ['Striler Name', 'Non-Striler Name', 'Bowler Name']

    for(let i =0;i<all_info.length;i++){
        console.log(all_info[i], i)
        if(all_info[i] === null || all_info[i] === undefined || all_info[i] === ''){
            alert(temp[i] + " Not Provided")
            return
        }
    }

    window.location.href = '../score_board/scoreBoard.html'
}