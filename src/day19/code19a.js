let _ = require('lodash');

let input = 3018458;
// let input = 5;

let elves = new Array(input);
_.fill(elves, 1, 0);

function getNextElf(index) {
    let index2 = index;
    do {
        index2++;
        if (index2 === input) {
            index2 = 0;
        }
    } while (elves[index2] < 1);
    return index2;
}

let index = -1;
let index2 = 0;
while (index !== index2) {
    index = index2;
    let nextElf = getNextElf(index);
    elves[index] += elves[nextElf];
    elves[nextElf] = 0;
    index2 = getNextElf(index);
}

console.log('Last: ', index + 1);
