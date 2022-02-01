export function getRandGame() {
    return 'G' + Math.floor(Math.random()*10000+1)
}
export function getRandTeam() {
    return 'T' + Math.floor(Math.random()*10000+1)
}
export function getRandPlayer() {
    return 'P' + Math.floor(Math.random()*10000+1)
}
export function getRandPartnership() {
    return 'Pr' + Math.floor(Math.random()*10000+1)
}
export function getRandColor() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let bgColor = "rgb(" + x + "," + y + "," + z + ")";
    return bgColor
}
