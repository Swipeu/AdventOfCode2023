import * as fs from 'fs';

const file = fs.readFileSync('day9/input.txt', 'utf8');

function getNextInSequence(sequence: number[]): number{
    const diffSequence = getDiffSequence(sequence);
    if(diffSequence.every(n => n === 0)){
        return sequence[sequence.length - 1];
    }

    return sequence[sequence.length - 1] + getNextInSequence(diffSequence);
}

function getDiffSequence(sequence: number[]){
    return sequence.slice(1).map((n, index) => n - sequence[index])
}

let numberArray: number[] = [];

file.split(/\r?\n/).forEach((line, y) => {
    const originalSequence = line.match(/-?\d+/g).map(n => parseInt(n));

    numberArray.push(getNextInSequence(originalSequence));

})

const sum = numberArray.reduce((n, sum) => {
    return sum + n
}, 0)

console.log(sum)
