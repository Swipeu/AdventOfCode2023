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

function getCharacter(x: number, y: number){
    return map[y][x];
}

function isSymbol(x: number, y: number){
    return getCharacter(x, y) !== "."
}

function checkRangeIsPart(xStart: number, xEnd: number, lineY: number): boolean {

    for(let y = Math.max(0, lineY - 1); y <= Math.min(maxY, lineY + 1); y++){
        for(let x = Math.max(0, xStart - 1); x <= Math.min(maxX, xEnd + 1); x++){
            if(y === lineY && x >= xStart && x <= xEnd){
                continue;
            }

            if(isSymbol(x, y)){
                return true;
            }
        }
    }

    return false;
}

function getRangeNumber(xStart: number, xEnd: number, y: number): number {
    let numberString = "";
    for(let x = xStart; x <= xEnd; x++){
        numberString += getCharacter(x, y);
    }

    return parseInt(numberString);
}

for (let y = 0; y <= maxY; y++) {
    let startX = -1;
    let endX = -1;

    for (let x = 0; x <= maxX; x++) {
        const char = getCharacter(x, y)
        const number = parseInt(char);

        if (Number.isNaN(number)) {
            if(startX >= 0 && checkRangeIsPart(startX, endX, y)){
                numberArray = [...numberArray, getRangeNumber(startX, endX, y)]
            }
            startX = -1;
            endX = -1;
            continue;
        }

        if(startX < 0){
            startX = x;
        }

        endX = x;
    }
    
    if(startX >= 0 && checkRangeIsPart(startX, endX, y)){
        numberArray = [...numberArray, getRangeNumber(startX, endX, y)]
    }
}

console.log(numberArray)
const sum = numberArray.reduce((n, sum) => {
    return sum + n
}, 0)

console.log(sum)