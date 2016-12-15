let _ = require('lodash');
let fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let input = require('./input.txt');
// let input = require('./test.txt');

let commands = input.split('\n');
commands.pop();

let discList = _.map(commands, (command) => {
    let commandList = command.split(' ');
    let disc = {};
    disc.id = _.parseInt(commandList[1].split('#')[1]);
    disc.size = _.parseInt(commandList[3]);
    disc.start = _.parseInt(commandList[11].split('.')[0]);
    return disc;
});
discList.push({
    id: _.last(discList).id + 1,
    size: 11,
    start: 0
});

let found = false;
let time = -1;
while (!found) {
    time++;
    let math = _(discList)
            .map((disc) => {
                return (time + disc.id + disc.start) % disc.size;
            })
            .compact()
            .value()
        ;

    if (math.length === 0) {
        found = true;
    }
}
console.log('FOUND! time:', time);

