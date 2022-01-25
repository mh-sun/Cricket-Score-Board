import { getValue as nm_f} from './newMatch/newMatch.js'
import {getValue as team_f} from './teams/teams.js'
import { getValue as history_f} from './history/history.js'


let title = 'Cricket Scorer'
let menu = ['New Match', 'Teams', 'History']

let menu_f = {
    'New Match': nm_f,
    'Teams' : team_f,
    'History' : history_f
}
console.log(1)
export let batTable = ['Batsman', 'R', 'B', '4s', '6s', 'SR']
export {title, menu, menu_f}