import {bowler, game, nonStrike, onStrike, run} from "./Calc.js";
import {createElem, createElemText, updateScoreBoard} from "./scoreBoard.js";

export function undo() {

}

function updateProgressBar(run, partnership, i) {
    let elem = document.getElementById("myBar");
    console.log(run, partnership)
    let w = isNaN(run*100/partnership)? 0: Math.floor(run/partnership*87)
    elem.style.width = w+'%'
}

function updatePartnership() {
    let div = document.getElementsByClassName('modal')[0]
    div.innerHTML = ''
    console.log(game.innings[game.ci].partnerships)

    game.innings[game.ci].partnerships.forEach(partnership=>{
    // let partnerships = game.innings[game.ci].partnerships
    // let partnership = partnerships[partnerships.length - 1]
    // {
        function getEachPartnership(partnership) {
            let div = document.createElement('div')
            let div_i = createElem('div', div)


            createElem('span', div_i, 'font-20').innerText = partnership.playerOne.name
            createElem('span', div_i, 'font-20').innerText = partnership.playerOneRun
            // let divI = createElem('div', div_i)
            // divI.id = 'myProgress'
            // divI.innerHTML = '<div id="myBar"></div>'
            createElem('span', div_i, 'font-10').innerText = ("Extras:" + partnership.extras)
            div_i.classList.add('left-div')

            div_i = createElem('div', div)
            createElem('span', div_i, 'font-20').innerText = partnership.runs
            createElem('span', div_i, 'font-20').innerText = ("(" + partnership.balls + ')')
            div_i.classList.add('center-div')

            div_i = createElem('div', div)
            createElem('span', div_i, 'font-20').innerText = partnership.playerTwo.name
            createElem('span', div_i, 'font-20').innerText = partnership.playerTwoRun
            div_i.classList.add('right-div')

            return div
        }

        div.append(getEachPartnership(partnership))
        // updateProgressBar(partnership.playerOneRun, partnership.runs, 1)
        div.classList.add('element-center')
    })
}

export function getPartnership() {
    updateScoreBoard()
    updatePartnership()
    document.getElementsByClassName('modal-bg')[0].classList.add('bg-active')
}

export function getModal() {
    let div = document.createElement('div')
    div.classList.add('modal-bg')
    // div.classList.add('bg-active')

    let div_i = document.createElement('div')
    div_i.classList.add('modal')
    div.appendChild(div_i)

    let h4 = document.createElement('h4')
    div_i.appendChild(h4)
    let innings = game.innings[game.ci]
    h4.innerText = 'Extras: '+ innings.extra.bye+ ' B, '
    +innings.extra.legBye + ' LB, '
    +innings.extra.wide + ' WD, '
    +innings.extra.noBall + ' NB, '
    +innings.extra.penalty + ' P'

    div.addEventListener('click',function () {
        div.classList.remove('bg-active')
    })

    return div

}

export function getExtraRun() {
    updateScoreBoard()
    document.getElementsByClassName('modal-bg')[0].classList.add('bg-active')
}

