let _ = require('lodash');
let fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

// let input = require('./input.txt');
let input = require('./test.txt');

let commands = input.split('\n');
commands.pop();

let current = [0, 9];
function check(toCheck) {
    let current = [toCheck[0], toCheck[1]];
    _.forEach(commands, function (line) {
        let ips = _(line)
                .split('-')
                .map(_.parseInt)
                .value()
            ;
        console.log('current', current, ips);
        if (current[0] >= ips[0] && current[1] <= ips[1]) {
            console.log('BOOM');
        } else if (current[1] < ips[1] || current[0] > ips[0]) {
            console.log('if 1');
            // leave it alone
        } else if (current[1] >= ips[0]) {
            console.log('if 2');
            current[1] = ips[0] - 1;
        } else if (current[0] <= ips[1]) {
            console.log('if 3');
            current[0] = ips[1] + 1;
        }
    });
}

check(current);

console.log(current);
