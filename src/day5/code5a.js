let crypto = require('crypto');
let _ = require('lodash');

let input = 'abbhdwsy';

let keepGoing = true;
let index = 0;
let password = '';
while (keepGoing) {
    index++;
    let key = crypto.createHash('md5').update(input + index).digest('hex');
    if (key.substr(0, 5) === '00000') {
        password += _.nth(key, 5);
        if (password.length === 8) {
            keepGoing = false;
        }
    }
}

console.log('password', password);
