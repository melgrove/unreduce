# unreduce

### api

`unreduce(initial, config, callback)`

#### initial

number, array, or object.

#### config

number or object.

if number then it is the output array length

if array then it takes some properties:

##### config object: 
length: n  // same as when config is number  
until: n  // value to stop at  
flatten: true   // can set to false, default true  


#### callback

a callback function used to calculate the next element of the array

##### Parameters: `(e, i, base)`

##### e  
&nbsp;&nbsp;&nbsp;&nbsp;*required*  
&nbsp;&nbsp;&nbsp;&nbsp;it is the last element of the array  
  
##### i  
&nbsp;&nbsp;&nbsp;&nbsp;*optional*,  
&nbsp;&nbsp;&nbsp;&nbsp;it is the index of the last element of the array  

##### base  
&nbsp;&nbsp;&nbsp;&nbsp;*optional*  
&nbsp;&nbsp;&nbsp;&nbsp;it is the entire array
  
  
### Examples:  
```javascript
res = unreduce(0, 5, (n) => n + 2);
console.log(res)
// [0, 2, 4, 6, 8]

res = unreduce(1, {until: -5}, (n) => --n)
console.log(res)
// [1, 0, -1, -2, -3, -4, -5]

// rep(c(5,4,2), 2)
res = unreduce([5, 4, 2], 2, (e, i, rest) => rest[i-2])
console.log(res)
// [ 5, 4, 2, 5, 4, 2 ]

res = unreduce(1, 5, (n) => n*2)
console.log(res)
// [ 1, 2, 4, 8, 16 ]

res = unreduce(30, 5, (n) => n+1)
console.log(res)
// [ 30, 31, 32, 33, 34 ]

// simple sequence by using the iterator
res = unreduce(0, 5, (e, i) => i)
console.log(res)
// [ 0, 1, 2, 3, 4]

// manipulate a string
res = unreduce('abc', 4, (e) => e[2] + e[0] + e[1])
console.log(res)
// [ 'abc', 'cab', 'bca', 'abc', 'cab' ]

// Another way to create powers of 2 with only addition
res = unreduce(2, 5, (e, i, base) => base.reduce((acc, el) => acc + el))
console.log(res)
// [ 2, 2, 4, 8, 16 ]

// Fibonacci Sequence (first 30)
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


// Array of Objects
let user = {
    name: 'User',
    id: 0
}

res = unreduce(user, 3, (obj) => {obj.id = (obj.id + 1); return obj}) 
console.log(res)
/*
[
  { name: 'User', id: 1 },
  { name: 'User', id: 2 },
  { name: 'User', id: 3 }
]
*/
```

