let _ = require('lodash');
let fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let input = require('./input.txt');
// let input = require('./testb.txt');

let commands = input.split('\n');
commands.pop();

let good1 = /\[[^\]]*?(.)((?!\1).)\1.*?\][^\[]*?\2\1\2/;
let good2 = /(.)((?!\1).)\1.*\[[^\]]*\2\1\2\]?[^\[]*?/;

let count = _.reduce(commands, (agg, command) => {
    console.log('command', command, good1.test(command), good2.test(command));
    if (good1.test(command) || good2.test(command)) {
        agg++;
    }
    return agg;
}, 0);

console.log('count', count);
