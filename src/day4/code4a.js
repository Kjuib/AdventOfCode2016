let _ = require('lodash');
let fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let input = require('./input.txt');
// let input = require('./test.txt');

let commands = input.split('\n');

let sum = _.reduce(commands, (agg, command) => {
    let list = command.split('-');
    let key = list.pop().replace(']', '').split('[');
    let code = _.parseInt(key[0]);
    let hash = key[1];

    let hash2 = _(list.join(''))
            .countBy()
            .map((value, key) => {
                return {name: key, value: value};
            })
            .orderBy(['value', 'name'], 'desc')
            .slice(0, 5)
            .map('name')
            .join('')
        ;

    if (hash2 === hash) {
        agg += code;
    }

    return agg;
}, 0);

console.log('sum', sum);
