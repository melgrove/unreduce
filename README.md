# unreduce  
[![NPM version](https://img.shields.io/npm/v/unreduce.svg?style=flat)](https://www.npmjs.com/package/unreduce)

You've all heard of reducers, but nobody has told you about ✨*un*reducers✨! Similar to `unfold`, this package provides a higher-order function that recursively invokes a callback, appending the result of each invocation to an output array. 

## Usage

```javascript
const unreduce = require('unreduce');
```

### unreduce(initial, config, callback)

**`initial`** *required* (`number`, `array`, or `object`): The initial value(s) that are passed to the callback and from which the unreduction starts

**`config`** *required* (`number`, `object`)  
When `number`: The length of the output array  
When `object`:  
- `times` (`number`): Number of times to run the callback function  
- `until` (`number`): Run the callback funtion until the value it returns goes from greater than to less than or equal to this value, or less than to greater than or equal to this value 


**`callback(element, index, base)`** *required* (`function`): The callback function used to calculate the next element of the array from the last  
- `element` *required* (`any`): Last element of the array  
- `index` *optional* (`number`): Current index of the last element of the array  
- `base` *optional* (`array`): Entire current array
 
## Examples:  
```javascript
// Simple length 5 array with addition
unreduce(0, 5, (n) => n + 2)
[0, 2, 4, 6, 8]

// Stop at -3
unreduce(0, {until: -3}, (n) => --n)
[0, -1, -2, -3]

// Run the callback 2 times
unreduce([10, 20, 30], {times: 2}, (n) => n + 10)
[10, 20, 30, 40, 50]

// Fibonacci Sequence
unreduce([0, 1],  30, (e, i, base) => base[i-1] + base[i-2])
[
      0,      1,      1,      2,      3,
      5,      8,     13,     21,     34,
     55,     89,    144,    233,    377,
    610,    987,   1597,   2584,   4181,
   6765,  10946,  17711,  28657,  46368,
  75025, 121393, 196418, 317811, 514229
]

// Powers of 2
unreduce(1, 5, (n) => n*2)
[ 1, 2, 4, 8, 16 ]

// Another way to create powers of 2 with only addition
unreduce(2, 5, (e, i, base) => base.reduce((acc, el) => acc + el))
[ 2, 2, 4, 8, 16 ]

// simple sequence by using the iterator
unreduce(0, 5, (e, i) => i)
[0, 1, 2, 3, 4]

// manipulate a string
unreduce('abc', 4, (e) => e[2] + e[0] + e[1])
[ 'abc', 'cab', 'bca', 'abc']
```

