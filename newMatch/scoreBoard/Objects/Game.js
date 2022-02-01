import {Innings} from "./Innings.js";

export function Game (gid, bat, bowl, over){
    this.id = gid
    this.over = over
    this.innings = [new Innings(bat, bowl), new Innings(bowl, bat)]
    this.ci = 0
}