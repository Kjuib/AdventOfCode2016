let _ = require('lodash');
let fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let input = require('./input.txt');
// let input = require('./test.txt');

let commands = input.split('\n');
commands.pop();

let good = /(.)((?!\1).)\2\1/;
let bad = /\[[^\]]*(.)((?!\1).)\2\1.*]/;

let count = _.reduce(commands, (agg, command) => {
    if (good.test(command) && !bad.test(command)) {
        agg++;
    }
    return agg;
}, 0);

console.log('count', count);
