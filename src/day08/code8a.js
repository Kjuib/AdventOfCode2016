let _ = require('lodash');
let fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let input = require('./input.txt');
let size = [50, 6];
// let input = require('./test.txt');
// let size = [7, 3];

let commands = input.split('\n');
commands.pop();

let screen = [];

let print = function() {
    let str = _.reduce(screen, (agg, row) => {
        return agg + _.reduce(row, (agg, point) => {
            return agg + (point.value ? '#' : '.');
            }, '') + '\n';
    }, '');
    console.log(str);
};

let count = function() {
    return _.reduce(screen, (agg, row) => {
        return agg + _.reduce(row, (agg, point) => {
            return agg + (point.value ? 1 : 0);
            }, 0);
    }, 0);
};

let createScreen = function() {
    for (let y = 0; y < size[1]; y++) {
        let row = [];
        for (let x = 0; x < size[0]; x++) {
            row.push({ value: false });
        }
        screen.push(row);
    }
};

let rect = function(x1, y1) {
    for (let y = 0; y < y1; y++) {
        for (let x = 0; x < x1; x++) {
            screen[y][x].value = true;
        }
    }
};

let rotRow = function(row, count) {
    for (let i = 0; i < count; i++) {
        let point = screen[row].pop();
        screen[row].unshift(point);
    }
};

let rotCol = function(col, count) {
    screen = _.zip(...screen);
    rotRow(col, count);
    screen = _.zip(...screen);
};

createScreen();

_.forEach(commands, (line) => {
    let command = line.split(' ');
    if (command[0] === 'rect') {
        command = command[1].split('x');
        rect(_.parseInt(command[0]), _.parseInt(command[1]));
    } else if (command[1] === 'row') {
        rotRow(_.parseInt(command[2].split('=')[1]), _.parseInt(command[4]));
    } else if (command[1] === 'column') {
        rotCol(_.parseInt(command[2].split('=')[1]), _.parseInt(command[4]));
    }

    print();
});

console.log('count()', count());
