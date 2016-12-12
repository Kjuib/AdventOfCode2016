let _ = require('lodash');

// NOT WORKING!!!

/*
 The first floor contains a strontium generator, a strontium-compatible microchip, a plutonium generator, and a plutonium-compatible microchip.
 The second floor contains a thulium generator, a ruthenium generator, a ruthenium-compatible microchip, a curium generator, and a curium-compatible microchip.
 The third floor contains a thulium-compatible microchip.
 The fourth floor contains nothing relevant.
 */

let items = [
    { name: 'S', type: 'G', floor: 1 },
    { name: 'S', type: 'M', floor: 1 },
    { name: 'P', type: 'G', floor: 1 },
    { name: 'P', type: 'M', floor: 1 },
    { name: 'T', type: 'G', floor: 2 },
    { name: 'T', type: 'M', floor: 3 },
    { name: 'R', type: 'G', floor: 2 },
    { name: 'R', type: 'M', floor: 2 },
    { name: 'C', type: 'G', floor: 2 },
    { name: 'C', type: 'M', floor: 2 },
];

// let items = [
//     { name: 'H', type: 'G', floor: 2 },
//     { name: 'H', type: 'M', floor: 1 },
//     { name: 'L', type: 'G', floor: 3 },
//     { name: 'L', type: 'M', floor: 1 },
// ];

let ele = {
    items: [],
    floor: 1
};

function print() {
    for (let i = 4; i >= 1; i--) {
        let str = 'F' + i + ' ';

        if (ele.floor === i) {
            str += 'E ';
        } else {
            str += '. ';
        }

        _.forEach(items, (item) => {
            if (item.floor === i) {
                str += item.name + item.type + ' ';
            } else {
                str += '.  ';
            }
        });
        console.log(str);
    }
}

print();
