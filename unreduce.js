'use strict';


function unreduce(initial, config, callback) {

    //if(typeof initial !== 'number' && !Array.isArray(initial)) throw 'a'
    if(typeof callback !== 'function') throw 'a'
    if(typeof config == 'number') return typeNumber();
    else if (typeof config == 'object') return typeObject();
    else throw 'a'

    function chooseCallback(out, n, callback) {
        
        switch (callback.length) {
            case 1: 
                return callback(out[n-1]);
            case 2:
                return callback(out[n-1], n);
            case 3:
                return callback(out[n-1], n, out);
            default: 
                throw 'Callback has too many parameters'
        }
    }

    function typeNumber() {
        let out = (Array.isArray(initial) ? [...initial] : [initial]);
        // [1, ]
        for(let n = out.length; n < config; n++) {
            // if object we must assign to prevent mutation
            if(Object.prototype.toString.call(initial) == '[object Object]') {
                out.push(Object.assign({}, chooseCallback(out, n, callback)))
            }
            else out.push(chooseCallback(out, n, callback))

            //  console.log(chooseCallback(out, n, callback))            // DEBUG

        };  

        if(config == 0) {
            return []
        } else if(config < 0) {
            throw 'Length must be positive'
        }
        
        return out
    }

    function typeObject() {
        if('times' in config && 'until' in config) throw 'a'

        else if('times' in config) {
            config = config.times
            return typeNumber();
        } 
        else if('until' in config) {
            let max = ('max' in config ? (config.max === null ? Infinity : config.max ) : 10000);
            let iter = 0

            let out = [initial]

            let isLower = initial < config.until;
            

            if(isLower) {
                while(out[out.length - 1] <= config.until) {
                    if(iter > max) {
                        console.log('Series Longer than max 10,000. Use {max: null} to disable')
                        break
                    }
                    out.push(callback(out[out.length - 1]))
                    iter++
                };
            } else {
                while(out[out.length - 1] >= config.until) {
                    if(iter > max) {
                        console.log('Series Longer than max 10,000. Use {max: null} to disable');
                        break
                    }
                    out.push(callback(out[out.length - 1]))
                    iter++
                };
            }
    
            
            // remove last element because it is over
            out.splice(out.length - 1, 1)

            return out
        }
        
    }

    
};

let res;

res = unreduce(1, {until: -5}, (n) => --n)
console.log(res)
// [1, 0, -1, -2, -3, -4, -5]

res = unreduce(0, 5, (n) => n + 2);
console.log(res)
// [0, 2, 4, 6, 8]

// rep(c(5,4,2), rep(3, 3))
res = unreduce([5, 4, 2], 3, (e, i, rest) => rest[i-3])
console.log(res)

res = unreduce(1, 5, (n) => n*2)
console.log(res)
// [ 1, 2, 4, 8, 16]

res = unreduce(1, 10, (n) => n+1)
console.log(res)
// [ 1, 2, 4, 8, 16]

// simple sequence by using the iterator
res = unreduce(0, 5, (e, i) => i)
console.log(res)
// [ 1, 2, 4, 8, 16]


// Another way to create powers of 2
res = unreduce(1, 10, (e, i, base) => base.reduce((acc, el) => acc + el))
console.log(res)
// [ 1, 2, 4, 8, 16]


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



// FUTURE
/*

unreduce(10, times=3, flatten=true, (el) => [el, el])





unreduce(1, until=5, flatten=true, (n) => [n+1, n+2]);
*/
/*
0
0 1 2
0 1 2 3 4
0 1 2 3 4 5 6
0 1 2 3 4 5 6 7 8
0 1 2 3 4 5 6 7 8 9 10



10
10 10 10
10 10 10 10 10 10 10
10 10 10 10 10 10 10 10 10 10 10 10 10 10 10

*/
//console.log(_1);


