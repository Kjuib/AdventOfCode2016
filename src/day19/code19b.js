let _ = require('lodash');

// let input = 3018458;
// let input = 5;

function solve(input) {
    let elves = [];
    for (let i = 0; i < input; i++) {
        elves.push(i + 1);
    }

    function getNextIndex(index) {
        let next = (elves.length / 2) + index;
        if (next >= elves.length) {
            next -= elves.length
        }
        if (!_.isInteger(next)) {
            next = _.floor(next);
        }
        return next;
    }

    let current = elves[0];
    // let currentTime = new Date().getTime();
    while (elves.length > 1) {
        let index = _.indexOf(elves, current);
        let nextIndex = getNextIndex(index);
        // if (index % 100 === 0) {
        //     let newTime = new Date().getTime();
        //     console.log(index, elves[index], elves[nextIndex], elves.length, newTime - currentTime);
        //     currentTime = newTime;
        // }
        elves[nextIndex] = 0;
        elves = _.compact(elves);
        let nextCurrent = _.indexOf(elves, current) + 1;
        if (nextCurrent >= elves.length) {
            nextCurrent = 0;
        }
        current = elves[nextCurrent];
    }
    console.log('WINNER:', input, elves[0]);
}

for (let i = 5; i < 100; i++) {
    solve(i);
}




