// let input = 'R2, L3';
// let input = 'R2, R2, R2';
// let input = 'R5, L5, R5, R3';
// let input = 'R8, R4, R4, R8';
let input = 'L1, L3, L5, L3, R1, L4, L5, R1, R3, L5, R1, L3, L2, L3, R2, R2, L3, L3, R1, L2, R1, L3, L2, R4, R2, L5, R4, L5, R4, L2, R3, L2, R4, R1, L5, L4, R1, L2, R3, R1, R2, L4, R1, L2, R3, L2, L3, R5, L192, R4, L5, R4, L1, R4, L4, R2, L5, R45, L2, L5, R4, R5, L3, R5, R77, R2, R5, L5, R1, R4, L4, L4, R2, L4, L1, R191, R1, L1, L2, L2, L4, L3, R1, L3, R1, R5, R3, L1, L4, L2, L3, L1, L1, R5, L4, R1, L3, R1, L2, R1, R4, R5, L4, L2, R4, R5, L1, L2, R3, L4, R2, R2, R3, L2, L3, L5, R3, R1, L4, L3, R4, R2, R2, R2, R1, L4, R4, R1, R2, R1, L2, L2, R4, L1, L2, R3, L3, L5, L4, R4, L3, L1, L5, L3, L5, R5, L5, L4, L2, R1, L2, L4, L2, L4, L1, R4, R4, R5, R1, L4, R2, L4, L2, L4, R2, L4, L1, L2, R1, R4, R3, R2, R2, R5, L1, L2';

let commands = input.split(', ');
let directions = [
    (point) => { point.y++;},
    (point) => { point.x++;},
    (point) => { point.y--;},
    (point) => { point.x--;},
];
let turns = {R: 1, L: -1};
let point = {x: 0, y: 0, facing: 0};

let locations = {'0,0': 1};

let calc = function(command) {
    let turn = command.substring(0, 1);
    let distance = parseInt(command.substring(1));
    point.facing += turns[turn];
    if (point.facing > 3) {
        point.facing = 0;
    } else if (point.facing < 0) {
        point.facing = 3;
    }

    for (let i = 0; i < distance; i++) {
        directions[point.facing](point);

        let label = point.x + ',' + point.y;
        if (!locations[label]) {
            locations[label] = 1;
        } else {
            locations[label]++;
            if (locations[label] === 2) {
                console.log('ENTERED TWICE!');
                console.log('point', point);
                console.log(Math.abs(point.x) + Math.abs(point.y));
            }
        }
    }
};

commands.map(calc);
console.log('point', point);
console.log(Math.abs(point.x) + Math.abs(point.y));
