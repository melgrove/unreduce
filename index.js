'use strict';

/**
 * @param {Object.<string, any> | Number | Array} initial
 * Initial value to generate array from. If an array, param element uses the last element.
 * @param {Number | Object.<string, number | boolean>} config  
 * `times` (`number`): Number of times to run the callback function  
 * `until` (`number`): Run the callback funtion until the value it returns goes from greater than to less than or equal, or less than to greater than or equal to this value 
 * @param {callback} callback
 * Function that generates the next element of the array
 * @returns {Array}
 */
function unreduce(initial, config, callback) {

    if(typeof callback !== 'function') throw Error('Callback must be a function');
    if(typeof config == 'number') return typeNumber();
    else if (typeof config == 'object') return typeObject();
    else throw Error('Config argument must either be a number or object');

    function chooseCallback(out, n, callback) {
        switch (callback.length) {
            case 1: 
                return callback(out[n-1]);
            case 2:
                return callback(out[n-1], n);
            case 3:
                return callback(out[n-1], n, out);
            default: 
                throw Error('Callback has too many parameters');
        }
    }

    function typeNumber() {
        let out = (Array.isArray(initial) ? initial : [initial]);

        if (config == 0) {
            return [];
        } else if(config < 0) {
            throw Error('Length must be positive');
        }

        // generate n-1 values to get output of length n
        for(let n = out.length; n < config; n++) {
            // if object we must assign to prevent mutation
            if (Object.prototype.toString.call(initial) == '[object Object]') {
                out.push(Object.assign({}, chooseCallback(out, n, callback)));
            } else {
                out.push(chooseCallback(out, n, callback));
            }
        };  

        return out;
    }

    function typeObject() {
        if('times' in config && 'until' in config) throw Error('May not include both `times` and `until` properties');
        let out = (Array.isArray(initial) ? initial : [initial]);
        if('times' in config) {
            config = out.length + config.times;
            return typeNumber();
        } 
        else if('until' in config) {
            let isLower = initial < config.until;
            if(isLower) {
                while(out[out.length - 1] <= config.until) {
                    out.push(callback(out[out.length - 1]));
                };
            } else {
                while(out[out.length - 1] >= config.until) {
                    out.push(callback(out[out.length - 1]));
                };
            }
            // remove last element because it is over
            out.splice(out.length - 1, 1);
            return out;
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