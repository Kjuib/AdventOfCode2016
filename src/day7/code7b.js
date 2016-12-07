let _ = require('lodash');
let fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let input = require('./input.txt');
// let input = require('./testb.txt');

let commands = input.split('\n');
commands.pop();

let good = /(?=((.)((?!\2).)\2))./g;

let count = _.reduce(commands, (agg, command) => {
    let list = _(command)
            .split('[')
            .flatMap((x) => _.split(x, ']'))
            .compact()
            .value()
        ;

    let goodToGo = false;
    for (let i = 0; i < list.length - 1; i++) {
        let match;
        while (match = good.exec(list[i])) {
            for (let j = i + 1; j < list.length; j += 2) {
                if (list[j].includes(match[3] + match[2] + match[3])) {
                    goodToGo = true;
                }
            }
        }
    }

    if (goodToGo) {
        agg++;
    }

    return agg;
}, 0);

console.log('count', count);
