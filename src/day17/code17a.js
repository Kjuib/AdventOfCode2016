let _ = require('lodash');
let crypto = require('crypto');

// let input = 'hijkl'; // test
// let input = 'ihgpwlah'; // test
// let input = 'kglvqrro'; // test
// let input = 'ulqzkmiv'; // test
let input = 'mmsxrhfx';

let isLocked = /[0-9a]/;
let moving = {
    U: [0, -1,],
    D: [0, 1],
    L: [-1, 0],
    R: [1, 0],
};
let results = [];

function getOptions(key, pos) {
    let hash = crypto.createHash('md5').update(input + key).digest('hex');
    let options = hash.substr(0, 4).split('');
    let rtn = [];
    if (!options[0].match(isLocked) && pos[1] > 0) {
        rtn.push('U');
    }
    if (!options[1].match(isLocked) && pos[1] < 3) {
        rtn.push('D');
    }
    if (!options[2].match(isLocked) && pos[0] > 0) {
        rtn.push('L');
    }
    if (!options[3].match(isLocked) && pos[0] < 3) {
        rtn.push('R');
    }

    return rtn;
}

function move(key, pos, length) {
    if (pos[0] === 3 && pos[1] === 3) {
        results.push({
            key: key,
            steps: length
        });
        return;
    } else if (length > 100) {
        return;
    }

    let options = getOptions(key, pos);
    _.forEach(options, (option) => {
        move(key + option, [pos[0] + moving[option][0], pos[1] + moving[option][1]], length + 1);
    });
}

move('', [0, 0], 0);
let answer = _(results)
        .sortBy('steps')
        .head()
    ;
console.log('Answer: ', answer);
