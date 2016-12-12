/*
 The first floor contains a strontium generator, a strontium-compatible microchip, a plutonium generator, and a plutonium-compatible microchip.
 The second floor contains a thulium generator, a ruthenium generator, a ruthenium-compatible microchip, a curium generator, and a curium-compatible microchip.
 The third floor contains a thulium-compatible microchip.
 The fourth floor contains nothing relevant.
 */

let layout = [
    {
        name: 'H',
        type: 'M',
        floor: 1
    },
    {
        name: 'L',
        type: 'M',
        floor: 1
    },
    {
        name: 'H',
        type: 'G',
        floor: 2
    },
    {
        name: 'L',
        type: 'G',
        floor: 3
    },
];

function print() {
    for (let i = 1; i <= 4; i++) {
        let str = 'F' + i;
    }
}
