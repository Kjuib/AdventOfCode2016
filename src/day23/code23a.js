let _ = require('lodash');
let fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let input = require('./input.txt');
// let input = require('./test.txt');

let commands = input.split('\n');
commands.pop();
commands = _.map(commands, (line) => line.split(' '));

let index = 0;
let register = {
    a: 7,
    b: 0,
    c: 0,
    d: 0,
};

function getValue(x) {
    if (_.includes(_.keys(register), x)) {
        return register[x];
    } else {
        return _.parseInt(x);
    }
}

let code = {
    cpy: (x, y) => {
        register[y] = getValue(x);
        index++;
    },
    inc: (x) => {
        register[x]++;
        index++;
    },
    dec: (x) => {
        register[x]--;
        index++;
    },
    jnz: (x, y) => {
        if (getValue(x) !== 0) {
            index += getValue(y);
        } else {
            index++;
        }
    },
    tgl: (x) => {
        let val = getValue(x);
        let command = commands[index + val];
        if (command) {
            switch (command[0]) {
                case 'cpy': command[0] = 'jnz'; break;
                case 'inc': command[0] = 'dec'; break;
                case 'dec': command[0] = 'inc'; break;
                case 'jnz': command[0] = 'cpy'; break;
                case 'tgl': command[0] = 'inc'; break;
            }
        }
        index++;
    }
};

while (index < commands.length) {
    let command = commands[index];
    // console.log('command', command, index);
    code[command[0]](command[1], command[2]);
    // console.log('register', register);
}

console.log('=======================');
console.log('a:', register.a);
