'use strict';

/**
 * 
 * @param {Object.<string, any> | Number | Array} initial
 * Initial value to generate array from. If an array, param element uses the last element.
 * @param {Number | Object.<string, number | boolean>} config 
 * length: n - same as when config is number  
 * until: n - value to stop at  
 * flatten: true - can set to false, default true
 * @param {callback} callback
 * Function that generates the next element of the array
 * @returns {Array}
 */
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

/**
 * @callback callback
 * @param {any} element
 * @param {number} [index]
 * @param {any} [base]
 */


module.exports = unreduce;