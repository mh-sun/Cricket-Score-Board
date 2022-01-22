let head = document.getElementsByTagName('head')[0]
let title = document.getElementsByTagName('title')[0]
let body = document.getElementsByTagName('body')[0]

// Setting A title
title.innerText = 'Cricket Scorer'

//Adding CSS
let css = document.createElement('link')
css.rel = 'stylesheet'
css.type = 'text/css'
css.href = 'cricket-scorer.css'
head.appendChild(css)

//Adding A DIV
let div = document.createElement('div')
div.className = 'topnav content-center'

let new_match = document.createElement('a')
new_match.innerText = 'New Match'

let teams = document.createElement('a')
teams.innerText = 'Teams'

let history = document.createElement('a')
history.innerText = 'History'

div.append(new_match, teams, history)
body.appendChild(div)