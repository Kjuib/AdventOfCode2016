let _ = require('lodash');

function calc(a) {
    let b = _(a)
            .split('')
            .reverse()
            .map((i) => i === '1' ? '0' : '1')
            .join('')
        ;
    return a + '0' + b;
}

function checksum(a) {
    let check = _(a)
            .split('')
            .chunk(2)
            .map((digits) => digits[0] === digits[1] ? '1' : '0')
            .join('')
        ;
    if (check.length % 2 === 0) {
        check = checksum(check);
    }
    return check;
}

// let fill = 20; // test
// let init = '10000'; // test
let fill = 272;
let init = '10111011111001111';

let current = init;
while (current.length < fill) {
    current = calc(current);
}
current = current.substr(0, fill);
console.log(checksum(current));
