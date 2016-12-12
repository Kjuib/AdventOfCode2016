let _ = require('lodash');
let fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let input = require('./input.txt');
// let input = require('./test.txt');

let commands = input.split('\n');
commands.pop();

let calc = function(line) {
    let rtn = 0;
    let index = 0;
    while (index < line.length) {
        let char = line.substr(index, 1);
        if (char === '(') {
            let repeatEnd = line.indexOf(')', index);
            let repeater = line.substr(index + 1, repeatEnd - index - 1).split('x');
            let repeatLength = _.parseInt(repeater[0]);
            let repeatCount = _.parseInt(repeater[1]);

            let repeatStr = calc(line.substr(repeatEnd + 1, repeatLength));

            index = repeatEnd + repeatLength;
            rtn += (repeatStr * repeatCount);
        } else {
            rtn++;
        }
        index++;
    }

    return rtn;
};

let process = function(line) {
    let rtn = calc(line);
    // console.log('Testing:', line, '  ', rtn);
    console.log('Length:', rtn);
};

_.forEach(commands, process);
