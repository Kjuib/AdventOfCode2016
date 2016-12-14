// Just maps the maze

let _ = require('lodash');

let start = [1,1];

let finish = [31, 39];
// let finish = [7, 4];

let input = 1350;
// let input = 10; //test


function isOpen(x, y) {
    let v = (x*x) + (3*x) + (2*x*y) + (y) + (y*y);
    v += input;
    v = v.toString(2).split('');
    v = _.countBy(v);
    return v['1'] % 2 === 0;
}

// let sizeX = 10;
// let sizeY = 6;
let sizeX = 50;
let sizeY = 50;


for (let j = 0; j < sizeY; j++) {
    let str = '';
    for (let i = 0; i < sizeX; i++) {
        if (i === start[0] && j === start[1]) {
            str += 's';
        } else if (i === finish[0] && j === finish[1]) {
            str += 'f';
        } else if (isOpen(i, j)) {
            str += '.';
        } else {
            str += '#';
        }
    }
    console.log(str);
}
