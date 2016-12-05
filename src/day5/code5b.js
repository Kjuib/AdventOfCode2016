let crypto = require('crypto');
let _ = require('lodash');

// let input = 'abc';
let input = 'abbhdwsy';

let keepGoing = 0;
let index = 0;
let password = [];
while (keepGoing < 8) {
    index++;
    let key = crypto.createHash('md5').update(input + index).digest('hex');
    if (key.substr(0, 5) === '00000') {
        let pos = _.nth(key, 5);
        if (pos < 8 && !password[pos]) {
            password[pos] = _.nth(key, 6);
            keepGoing++;
        }
    }
}

console.log('password', password.join(''));
