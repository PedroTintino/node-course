const os = require('os');
const { parse } = require('path');
// const math = require('./math');
const { add, subtract, multiply, divide } = require('./math')

// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname)
// console.log(__filename)

// console.log(parse(__filename))

// Theres two ways, by destructing and importing the metod directly, check it out above
// console.log(math.add(2,2))
console.log(add(2,2))
console.log(subtract(2,2))
console.log(multiply(2,2))
console.log(divide(2,2))
