export function player(name) {
    this.name = name
    this.getName = function () {
        return this.name
    }
}
