let _ = require('lodash');
let fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let input = require('./input.txt');
// let input = require('./test.txt');

let commands = input.split('\n');
commands.pop();

let other = commands.map((x) => x.split(''));
other = _.zip(...other);

other = _(other)
    .map((line) => {
        return _(line)
            .countBy()
            .map((value, key) => {
                return {name: key, value: value}
            })
            .orderBy('value', 'desc')
            .last().name
            ;
    })
    .join('')
;

console.log('other', other);
