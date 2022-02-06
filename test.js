function test(n) {
    this.test = {
        name: 'mehedi sun',
        age:24,
        setName: function (){
            console.log(this)
            set(n)
        }
    }
    this.set = function (name) {
        this.test.name = name
    }
}
let t = new test('Mehedi Hasan Sun')
console.log(t.test.name)
t.test.setName()
console.log(t.test.name)