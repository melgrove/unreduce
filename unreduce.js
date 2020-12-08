'use strict';

function unreduce(initial, config, callback) {

    //if(typeof initial !== 'number') throw 'a'
    if(typeof callback !== 'function') throw 'a'
    if(typeof config == 'number') return typeNumber();
    else if (typeof config == 'object') return typeObject();
    else throw 'a'

    function chooseCallback(out, n, callback) {
        
        switch (callback.length) {
            case 1: 
                return callback(out[n]);
            case 2:
                return callback(out[n], n);
            case 3:
                return callback(out[n], n, out);
            default: 
                throw 'Callback has too many parameters'
        }
    }

    function typeNumber() {
        let out = [initial];
        Array(config + 1).fill();
        out[0] = initial;

        for(let n = 0; n < config; n++) {
            console.log(chooseCallback(out, n, callback));
            
            out.push(chooseCallback(out, n, callback))
        };
        console.log(out);
        
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


unreduce(1, {until: -5}, (n) => --n)
// [1, 0, -1, -2, -3, -4, -5]


unreduce(0, 5, (n) => n + 2);
// [0, 2, 4, 6, 8, 10]

unreduce(1, 5, (n) => n*2)
// [ 1, 2, 4, 8, 16, 32 ]

console.log(unreduce([0, 1], {until:100}, (e, i, base) => base[i] + base[i-1]))
// Fibonacci Sequence equal to or less than 100


let user = {
    name: 'User',
    id: 0,
    TimeCreated: Date.now() 
}

unreduce(user, 2, (obj) => {obj.id = obj.id++; return obj}) 
// [{..., id: 0, ...}, {..., id: 1, ...}, {..., id: 2, ...}]


//console.log(typeof (() => 5))
let _1 = [1,2,3,4].reduce((acc, el) => (acc + el))

// until = (el) => el.length = 200
/*
unreduce(10, times=3, flatten=true, (el) => [el, el])


unreduce(0, times=5, (n) => n++);
// [0, 1, 2, 3, 4, 5]

unreduce(0, until=5, (n) => n++);
// [0, 1, 2, 3, 4, 5]

let user = {
    name: 'User',
    id: 0,
    TimeCreated: Date.now() 
}

unreduce(user, 2, (obj) => {obj.id = obj.id++; return obj}) 
// [{..., id: 0, ...}, {..., id: 1, ...}, {..., id: 2, ...}]


unreduce([0, 1], until=100, (e, i, base) => base[i] + base[i-1])
// Fibonacci Sequence equal to or less than 100




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


