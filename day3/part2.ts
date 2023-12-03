import * as fs from 'fs';

const file = fs.readFileSync('day3/input.txt', 'utf8');

let numberArray: number[] = [];

let map: string[][] = [];

let maxX: number;
let maxY: number;

file.split(/\r?\n/).forEach((line, y) => {
    let newArray: string[] = new Array(line.length)
    for (let x = 0; x < line.length; x++) {
        newArray[x] = line[x];
    }
    map[y] = newArray
    maxX = line.length - 1;
    maxY = y;
})

function getCharacter(x: number, y: number) {
    return map[y][x];
}

function isNumber(x: number, y: number) {
    return !Number.isNaN(parseInt(getCharacter(x, y)));
}

function isGear(x: number, y: number) {
    return getCharacter(x, y) === "*";
}

function getNumberAtLocation(x: number, y: number) {
    let fullNumber: string = getCharacter(x, y);

    let currentX = x - 1;

    while(currentX >= 0 && isNumber(currentX, y)){
        fullNumber = getCharacter(currentX, y) + fullNumber;
        currentX--;
    }

    currentX = x + 1;

    while(currentX <= maxY && isNumber(currentX, y)){
        fullNumber = fullNumber + getCharacter(currentX, y);
        currentX++;
    }

    return parseInt(fullNumber);
}

function getPartNumbersAroundGear(xGear: number, yGear: number) {

    let numbersAroundGear: number[] = [];
    for (let y = Math.max(0, yGear - 1); y <= Math.min(maxY, yGear + 1); y++) {
        let xWithNumbers: number[] = [];
        for (let x = Math.max(0, xGear - 1); x <= Math.min(maxX, xGear + 1); x++) {

            if (x === xGear) {
                if (y === yGear) {
                    continue;
                }
                else if (isNumber(x, y)){
                    if(xWithNumbers.length === 0){
                        xWithNumbers = [...xWithNumbers, x];
                    }
                    break;
                }
            }

            if (!isNumber(x, y)) {
                continue;
            }

            xWithNumbers = [...xWithNumbers, x];
        }
        xWithNumbers.forEach(xWithNumber => numbersAroundGear = [...numbersAroundGear, getNumberAtLocation(xWithNumber, y)])
    }

    return numbersAroundGear;
}

for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
        if(!isGear(x, y)){
            continue;
        }
        let numbers = getPartNumbersAroundGear(x, y);

        if(numbers.length != 2)
            continue;
        
        numberArray = [...numberArray, numbers[0] * numbers[1]]
    }
}

console.log(numberArray)
const sum = numberArray.reduce((n, sum) => {
    return sum + n
}, 0)

console.log(sum)