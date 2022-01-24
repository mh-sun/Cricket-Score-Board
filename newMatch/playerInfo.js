import { getValue as scoreBoard } from './scoreBoard/scoreBoard.js'

function getSection(name, id) {
    let h3 = document.createElement('h3')
    h3.innerText = name

    let div = document.createElement('div')
    div.className += ' container element-center content-center'
    let input = document.createElement('input')
    input.type = 'text'
    input.id = id
    input.placeholder = 'Team Name'
    input.className += ' input element-center'
    div.appendChild(input)

    return [h3, div]
}

function localSet() {
    return (localStorage.getItem('striker') === null ||
        localStorage.getItem('non_striker') === null ||
        localStorage.getItem('bowler') === null)
}

function func1() {
    let striker = document.getElementById('striker').value
    let non_striker = document.getElementById('non_striker').value
    let bowler = document.getElementById('bowler').value

    localStorage.setItem('striker', striker)
    localStorage.setItem('non_striker', non_striker)
    localStorage.setItem('bowler', bowler)

    let all_info = [striker, non_striker, bowler]
    let temp = ['Striker Name', 'Non-Striker Name', 'Bowler Name']

    for(let i =0;i<all_info.length;i++){
        if(all_info[i] === null || all_info[i] === undefined || all_info[i] === ''){
            alert(temp[i] + " Not Provided")
            return
        }
    }
}

function getSubmit() {
    let submit = document.createElement('input')
    submit.type = 'button'
    submit.value = 'Start Match'
    submit.className += ' element-center submit-form'
    submit.onclick = func1
    return submit
}

export function getValue() {
    let body  = document.getElementById('menu-content')
    body.innerHTML = ''
    let section = getSection('S T R I K E R', "striker")
    body.appendChild(section[0])
    body.appendChild(section[1])

    section = getSection('N O N - S T R I K E R', "non_striker")
    body.appendChild(section[0])
    body.appendChild(section[1])

    section = getSection('O P E N I N G - B O W L E R', "bowler")
    body.appendChild(section[0])
    body.appendChild(section[1])

    body.appendChild(document.createElement('br'))
    body.appendChild(document.createElement('br'))
    body.appendChild(getSubmit())
}

(function () {
    if(!localSet()){
        scoreBoard()
    }
})();