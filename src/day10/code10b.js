let _ = require('lodash');
let fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let input = require('./input.txt');
// let input = require('./test.txt');

let commands = input.split('\n');
commands.pop();

commands = _.map(commands, (line) => {
    return _.split(line, ' ');
});

let outputs = {};
let bots = {};

function getItem(key, id) {
    if (key === 'bot') {
        return bots[id] || createBot(id);
    } else {
        return outputs[id] || createOutput(id);
    }
}

function createOutput(id) {
    let output = {};
    output.values = [];
    output.addValue = function (x) {
        this.values.push(x);
    };
    outputs[id] = output;
    return output;
}

function createBot(id) {
    let bot = {};
    bot.id = id;
    bot.values = [];
    bot.addValue = function (x) {
        this.values.push(x);
        if (this.values.length === 2) {
            this.values.sort((a, b) => {
                return _.parseInt(a) - _.parseInt(b);
            });

            this.handleLow();
            this.handleHigh();
        }
    };
    bot.handleLow = function () {
        getItem(this.lowBucket, this.lowId).addValue(this.values.shift());
    };
    bot.handleHigh = function () {
        getItem(this.highBucket, this.highId).addValue(this.values.shift());
    };

    bots[bot.id] = bot;
    return bot;
}

_(commands)
    .filter((command) => command[0] === 'bot')
    .forEach((command) => {
        let bot = getItem('bot', command[1]);
        bot.lowBucket = command[5];
        bot.lowId = command[6];
        bot.highBucket = command[10];
        bot.highId = command[11];
    });

_(commands)
    .filter((command) => command[0] === 'value')
    .forEach((command) => {
        getItem(command[4], command[5]).addValue(command[1]);
    });

console.log('Score', outputs[0].values[0] * outputs[1].values[0] * outputs[2].values[0]);

// console.log('outputs', outputs);
// console.log('bots', bots);
