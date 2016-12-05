let _ = require('lodash');
let fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let input = require('./input.txt');
// let input = require('./test.txt');
// let input = 'qzmt-zixmtkozy-ivhz-343[zimth]';

let commands = input.split('\n');

_.forEach(commands, (command) => {
    let list = command.split('-');
    let key = list.pop().replace(']', '').split('[');
    let code = _.parseInt(key[0]);
    let hash = key[1];

    let hash2 = _(list.join(''))
            .countBy()
            .map((value, key) => {
                return {name: key, value: value};
            })
            .orderBy(['value', 'name'], 'desc')
            .slice(0, 5)
            .map('name')
            .join('')
        ;

    if (hash2 === hash) {
        let rot = code % 26;
        let name = list
                .join(' ')
                .split('')
                .map((char) => {
                    if (char !== ' ') {
                        let charInt = char.charCodeAt(0);
                        charInt += rot;
                        if (charInt > 122) {
                            charInt -= 26;
                        }
                        char = String.fromCharCode(charInt);

                    }
                    return char;
                })
                .join('')
            ;

        if (name.includes('north')) {
            console.log(code, name);
        }
    }
});
