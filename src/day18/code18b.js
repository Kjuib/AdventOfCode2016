let _ = require('lodash');

let input = '.^^^^^.^^^..^^^^^...^.^..^^^.^^....^.^...^^^...^^^^..^...^...^^.^.^.......^..^^...^.^.^^..^^^^^...^.';
// let input = '..^^.';
// let input = '.^^.^.^^^^';
let rowCount = 400000;

let map = [];
map.push(input.split(''));

function printMap() {
    _.forEach(map, (row) => {
        let str = '';
        _.forEach(row, (point) => {
            str += point;
        });
        console.log(str);
    });
}

function calcRow(prev) {
    let row = [];

    for (let i = 0; i < prev.length; i++) {
        let l = prev[i - 1] || '.';
        let c = prev[i];
        let r = prev[i + 1] || '.';

        if (l === '^' && c === '^' && r === '.') {
            row.push('^');
        } else if (l === '.' && c === '^' && r === '^') {
            row.push('^');
        } else if (l === '^' && c === '.' && r === '.') {
            row.push('^');
        } else if (l === '.' && c === '.' && r === '^') {
            row.push('^');
        } else {
            row.push('.');
        }

    }


    return row;
}

function count() {
    let c = _.flatten(map);
    c = _.countBy(c);
    console.log('SAFE:', c['.']);
}

for (let i = 1; i < rowCount; i++) {
    map.push(calcRow(map[i - 1]))
}

// printMap();
count();
