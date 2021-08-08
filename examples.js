const unreduce = require('./index')
let res

// Simple length 5 array with addition
res = unreduce(0, 5, (n) => n + 2)
console.log(res)
// [0, 2, 4, 6, 8]

// Stop at -3
res = unreduce(0, {until: -3}, (n) => --n)
console.log(res)
// [0, -1, -2, -3]

// Run the callback 2 times
res = unreduce([10, 20, 30], {times: 2}, (n) => n + 10)
console.log(res)
// [10, 20, 30, 40, 50]

// Fibonacci Sequence
res = unreduce([0, 1],  30, (e, i, base) => base[i-1] + base[i-2])
console.log(res)
/*
[
      0,      1,      1,      2,      3,
      5,      8,     13,     21,     34,
     55,     89,    144,    233,    377,
    610,    987,   1597,   2584,   4181,
   6765,  10946,  17711,  28657,  46368,
  75025, 121393, 196418, 317811, 514229
]
*/

// Powers of 2
res = unreduce(1, 5, (n) => n*2)
console.log(res)
// [ 1, 2, 4, 8, 16 ]

// Another way to create powers of 2 with only addition
res = unreduce(2, 5, (e, i, base) => base.reduce((acc, el) => acc + el))
console.log(res)
// [ 2, 2, 4, 8, 16 ]

// simple sequence by using the iterator
res = unreduce(0, 5, (e, i) => i)
console.log(res)
// [0, 1, 2, 3, 4]

// manipulate a string
res = unreduce('abc', 4, (e) => e[2] + e[0] + e[1])
console.log(res)
// [ 'abc', 'cab', 'bca', 'abc']