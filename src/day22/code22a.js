let _ = require('lodash');
let fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

// let input = require('./input.txt');
let input = require('./test.txt');

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

let pairCount = 0;
_.forEach(nodes, (nodeA) => {
    _.forEach(nodes, (nodeB) => {
        if (nodeA.used > 0 && nodeA.name !== nodeB.name && nodeA.used <= nodeB.avail) {
            pairCount++;
        }
    });
});

console.log('pairCount', pairCount);
