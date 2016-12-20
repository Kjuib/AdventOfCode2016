let _ = require('lodash');
let fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let input = require('./input.txt');
// let input = require('./test.txt');
let max = 4294967295;
// let max = 9;

let commands = input.split('\n');
commands.pop();

let start = [0, max];
let doOver = false;
function check(toCheck) {
    doOver = false;

    let current = [toCheck[0], toCheck[1]];
    _.forEach(commands, function (line) {
        if (doOver) {
            return;
        }

        let ips = _(line)
                .split('-')
                .map(_.parseInt)
                .value()
            ;
        if (current[0] >= ips[0] && current[1] <= ips[1]) {
            if (!doOver) {
                doOver = true;
                start = [ips[1] + 1, max];
            }
        } else if (current[0] > ips[1] || current[1] < ips[0]) {
            // leave it alone
        } else if (current[0] >= ips[0] && current[1] > ips[1]) {
            current[0] = ips[1] + 1;
        } else if (current[1] >= ips[0] && current[0] < ips[0]) {
            current[1] = ips[0] - 1;
        } else if (current[0] <= ips[1]) {
            current[0] = ips[1] + 1;
        } else {
            console.log('OOPS');
        }
    });
    return current;
}

let answers = [];
while (!_.last(answers) || _.last(answers) < max) {
    let current;
    do {
        current = check(start);
        if (current[0] > max) {
            doOver = false;
        }
    } while (doOver);
    answers.push(current[0]);
    start = [current[0] + 1, max];
}

console.log('Count: ', answers.length - 1);
