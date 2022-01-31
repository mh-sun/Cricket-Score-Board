import {innings} from "./innings.js";

export function game(gid, bat, bowl, over) {
    this.id = gid
    this.over = over
    this.innings = [new innings(bat, bowl), new innings(bowl, bat)]
    this.ci = 0
}