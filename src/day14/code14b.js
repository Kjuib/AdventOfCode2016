let _ = require('lodash');
let crypto = require('crypto');

let input = 'zpqevtbw';
// let input = 'abc'; //test

let index = -1;
let search = /(.)\1{2}/g;
let checking = [];
let found = [];

function hash(str) {
    let current = str;
    for (let i = 0; i < 2017; i++) {
        current = crypto.createHash('md5').update(current).digest('hex');
    }
    return current;
}

while (found.length <= 64) {
    index++;
    let key = hash(input + index);

    _.forEach(checking, (state) => {
        if (state.check.test(key)) {
            state.counter = index;
            found.push(state);
        }
    });
    _.remove(checking, (check) => {
        return check.counter || (index - check.index > 1000)
    });


    _.remove(checking, {done: true});

    let reg = key.match(search);
    if (reg) {
        let char = reg[0].substr(0, 1);
        let state = {
            char: char,
            index: index,
            check: new RegExp(_.repeat(char, 5)),
            counter: null
        };

        checking.push(state);
    }
}

console.log('found', _.sortBy(found, 'index'));
console.log(found[63]);
