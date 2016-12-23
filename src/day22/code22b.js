let _ = require('lodash');
let fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let input = require('./input.txt');
// let input = require('./test.txt');

let commands = input.split('\n');
commands.pop();
commands.shift();
commands.shift();

let nodes = _(commands)
        .map((line) => _(line).split(' ').compact().value())
        .map((line) => {
            let pos = line[0].split('-');
            return {
                name: line[0],
                posX: _.parseInt(pos[1].substr(1)),
                posY: _.parseInt(pos[2].substr(1)),
                max: _.parseInt(line[1]),
                used: _.parseInt(line[2]),
                avail: _.parseInt(line[3]),
            };
        })
        .value()
    ;

function draw() {
    let rows = [];

    _.forEach(nodes, (node) => {
        if (!rows[node.posY]) {
            rows[node.posY] = [];
        }
        rows[node.posY][node.posX] = node;
    });

    _.forEach(rows, (row) => {
        let str = '';
        _.forEach(row, (node) => {
            str += _.padStart(node.used, 4);
            str += '/';
            str += _.padStart(node.max, 4);
            str += '  ';
        });
        console.log(str);
    });
}

draw();

let nodes2 = _.filter(nodes, (node) => {
    return node.avail > 60;
});
console.log('nodes2', nodes2);
