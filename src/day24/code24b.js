let _ = require('lodash');
let fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let input = require('./input.txt');
let points = ['1', '2', '3', '4', '5', '6', '7'];

// let input = require('./test.txt');
// let points = ['1', '2', '3', '4'];

let maze = input.split('\n');
maze.pop();
maze = _.map(maze, (line) => _.split(line, ''));


let fastest = findFastest(points, maze);
console.log('Fastest:', fastest.steps - points.length - 1);

// console.log(maze);
// console.log(findPoint(maze, 0), findPoint(maze, 4));
// console.log(findPath(maze, findPoint(maze, '2'), findPoint(maze, '3')));
// console.log(permute(points));
// console.log(JSON.stringify(createConnections(points, maze)));

function findFastest(points, maze) {
    let connections = createConnections(points, maze);
    let paths = permute(points).map((list) => _.concat('0', list, '0'));

    let fastest = {
        name: 'bad',
        steps: Infinity
    };

    _.forEach(paths, (path) => {
        let count = 0;
        for (let i = 1; i < path.length; i++) {
            let point1 = path[i - 1];
            let point2 = path[i];
            let connection = _.find(connections, (c) => {
                return _.includes(c.points, point1) && _.includes(c.points, point2);
            });
            count += connection.path.length;
        }

        if (count < fastest.steps) {
            fastest = {
                name: path,
                steps: count
            };
        }
    });

    return fastest;
}

function createConnections(points, maze) {
    let connections = [];
    function newConnection(point1, point2) {
        connections.push({
            points: [point1, point2],
            path: findPath(maze, findPoint(maze, point1), findPoint(maze, point2))
        });
    }

    _.forEach(points, (point1, i1) => {
        newConnection('0', point1);

        _.forEach(points, (point2, i2) => {
            if (i2 > i1) {
                newConnection(point1, point2)
            }
        });
    });
    return connections;
}

function findPoint(maze, label) {
    return _.reduce(maze, (agg, current, y) => {
        let x = _.indexOf(current, label);
        if (x >= 0) {
            return [x, y];
        } else {
            return agg;
        }
    }, 0);
}

function permute(input) {
    let usedChars = [];
    let permList = [];

    function permute2(input) {
        for (let i = 0; i < input.length; i++) {
            let ch = input.splice(i, 1)[0];

            usedChars.push(ch);
            if (input.length == 0) {
                permList.push(usedChars.slice());
            }
            permute2(input);
            input.splice(i, 0, ch);
            usedChars.pop();
        }
    }
    permute2(input);
    return permList
}

// world is a 2d array of integers (eg world[10][15] = 0)
// pathStart and pathEnd are arrays like [5,10]
function findPath(world, pathStart, pathEnd) {
    // shortcuts for speed
    var abs = Math.abs;
    var max = Math.max;
    var pow = Math.pow;
    var sqrt = Math.sqrt;

    // keep track of the world dimensions
    // Note that this A-star implementation expects the world array to be square:
    // it must have equal height and width. If your game world is rectangular,
    // just fill the array with dummy values to pad the empty space.
    var worldWidth = world[0].length;
    var worldHeight = world.length;
    var worldSize = worldWidth * worldHeight;

    // which heuristic should we use?
    // default: no diagonals (Manhattan)
    var distanceFunction = ManhattanDistance;
    var findNeighbours = function () {
    }; // empty

    // distanceFunction functions
    // these return how far away a point is to another

    function ManhattanDistance(Point, Goal) {	// linear movement - no diagonals - just cardinal directions (NSEW)
        return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
    }

    // Neighbours functions, used by findNeighbours function
    // to locate adjacent available cells that aren't blocked

    // Returns every available North, South, East or West
    // cell that is empty. No diagonals,
    // unless distanceFunction function is not Manhattan
    function Neighbours(x, y) {
        var N = y - 1,
            S = y + 1,
            E = x + 1,
            W = x - 1,
            myN = N > -1 && canWalkHere(x, N),
            myS = S < worldHeight && canWalkHere(x, S),
            myE = E < worldWidth && canWalkHere(E, y),
            myW = W > -1 && canWalkHere(W, y),
            result = [];
        if (myN)
            result.push({x: x, y: N});
        if (myE)
            result.push({x: E, y: y});
        if (myS)
            result.push({x: x, y: S});
        if (myW)
            result.push({x: W, y: y});
        findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
        return result;
    }

    // returns boolean value (world cell is available and open)
    function canWalkHere(x, y) {
        return ((world[y] != null) &&
        (world[y][x] != null) &&
        (world[y][x] !== '#'));
    }

    // Node function, returns a new object with Node properties
    // Used in the calculatePath function to store route costs, etc.
    function Node(Parent, Point) {
        var newNode = {
            // pointer to another Node object
            Parent: Parent,
            // array index of this Node in the world linear array
            value: Point.x + (Point.y * worldWidth),
            // the location coordinates of this Node
            x: Point.x,
            y: Point.y,
            // the distanceFunction cost to get
            // TO this Node from the START
            f: 0,
            // the distanceFunction cost to get
            // from this Node to the GOAL
            g: 0
        };

        return newNode;
    }

    // Path function, executes AStar algorithm operations
    function calculatePath() {
        // create Nodes from the Start and End x,y coordinates
        var mypathStart = Node(null, {x: pathStart[0], y: pathStart[1]});
        var mypathEnd = Node(null, {x: pathEnd[0], y: pathEnd[1]});
        // create an array that will contain all world cells
        var AStar = new Array(worldSize);
        // list of currently open Nodes
        var Open = [mypathStart];
        // list of closed Nodes
        var Closed = [];
        // list of the final output array
        var result = [];
        // reference to a Node (that is nearby)
        var myNeighbours;
        // reference to a Node (that we are considering now)
        var myNode;
        // reference to a Node (that starts a path in question)
        var myPath;
        // temp integer variables used in the calculations
        var length, max, min, i, j;
        // iterate through the open list until none are left
        while (length = Open.length) {
            max = worldSize;
            min = -1;
            for (i = 0; i < length; i++) {
                if (Open[i].f < max) {
                    max = Open[i].f;
                    min = i;
                }
            }
            // grab the next node and remove it from Open array
            myNode = Open.splice(min, 1)[0];
            // is it the destination node?
            if (myNode.value === mypathEnd.value) {
                myPath = Closed[Closed.push(myNode) - 1];
                do
                {
                    result.push([myPath.x, myPath.y]);
                }
                while (myPath = myPath.Parent);
                // clear the working arrays
                AStar = Closed = Open = [];
                // we want to return start to finish
                result.reverse();
            }
            else // not the destination
            {
                // find which nearby nodes are walkable
                myNeighbours = Neighbours(myNode.x, myNode.y);

                // test each one that hasn't been tried already
                for (i = 0, j = myNeighbours.length; i < j; i++) {
                    myPath = Node(myNode, myNeighbours[i]);
                    if (!AStar[myPath.value]) {
                        // estimated cost of this particular route so far
                        myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
                        // estimated cost of entire guessed route to the destination
                        myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
                        // remember this new path for testing above
                        Open.push(myPath);
                        // mark this node in the world graph as visited
                        AStar[myPath.value] = true;
                    }
                }
                // remember this route as having no more untested options
                Closed.push(myNode);
            }
        } // keep iterating until until the Open list is empty
        return result;
    }
    // actually calculate the a-star path!
    // this returns an array of coordinates
    // that is empty if no path is possible
    return calculatePath();

} // end of findPath() function
