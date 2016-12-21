let _ = require('lodash');
let fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let input = require('./input.txt');
let init = 'fbgdceah';

// let input = require('./test.txt');
// let init = 'decab';

let commands = input.split('\n');
commands.pop();
commands.reverse();

let password = init.split('');
_.forEach(commands, (line) => {
    let command = line.split(' ');
    if (command[0] === 'swap' && !_.includes(password, command[2])) {
        let pos1 = _.parseInt(command[2]);
        let pos2 = _.parseInt(command[5]);
        let val1 = password[pos1];
        let val2 = password[pos2];
        password[pos1] = val2;
        password[pos2] = val1;
    } else if (command[0] === 'swap' && _.includes(password, command[2])) {
        let pos1 = _.indexOf(password, command[2]);
        let pos2 = _.indexOf(password, command[5]);
        let val1 = password[pos1];
        let val2 = password[pos2];
        password[pos1] = val2;
        password[pos2] = val1;
    } else if (command[0] === 'reverse') {
        let pos1 = _.parseInt(command[2]);
        let pos2 = _.parseInt(command[4]);
        let part1 = _.slice(password, 0, pos1);
        let part2 = _.slice(password, pos1, pos2 + 1);
        let part3 = _.slice(password, pos2 + 1);
        password = _.concat(part1, _.reverse(part2), part3);
    } else if (command[0] === 'rotate' && command[1] === 'left') {
        let count = _.parseInt(command[2]);
        for (let i = 0; i < count; i++) {
            let item = password.pop();
            password.unshift(item);
        }
    } else if (command[0] === 'rotate' && command[1] === 'right') {
        let count = _.parseInt(command[2]);
        for (let i = 0; i < count; i++) {
            let item = password.shift();
            password.push(item);
        }
    } else if (command[0] === 'rotate' && command[1] === 'based') {
        let count = 0;
        switch (_.indexOf(password, command[6])) {
            case (0) : {
                count = 1;
                break;
            }
            case (1) : {
                count = 1;
                break;
            }
            case (2) : {
                count = 6;
                break;
            }
            case (3) : {
                count = 2;
                break;
            }
            case (4) : {
                count = 7;
                break;
            }
            case (5) : {
                count = 3;
                break;
            }
            case (6) : {
                count = 0;
                break;
            }
            case (7) : {
                count = 4;
                break;
            }
        }
        for (let i = 0; i < count; i++) {
            let item = password.shift();
            password.push(item);
        }
    } else if (command[0] === 'move') {
        let pos1 = _.parseInt(command[2]);
        let pos2 = _.parseInt(command[5]);
        let val = password[pos2];
        _.pull(password, val);
        password.splice(pos1, 0, val);
    } else {
        console.log('NO HIT');
    }

    console.log('password', password);
});

console.log('Final:', password.join(''));
