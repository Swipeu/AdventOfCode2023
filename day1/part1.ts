import * as fs from 'fs';

const file = fs.readFileSync('day1/input.txt','utf8');

let numberArray: number[] = []; 

file.split('\n').forEach(line => {
    let firstNumber: string | undefined = undefined;
    let secondNumber: string | undefined;

    for (let i = 0; i < line.length; i++) {
        const number = parseInt(line[i]);

        if(Number.isNaN(number))
            continue;
        
        if(firstNumber == undefined){
            firstNumber = line[i];
        }

        secondNumber =  line[i];
    }

    if(firstNumber == undefined || secondNumber == undefined)
        return;

        numberArray = [...numberArray, parseInt(firstNumber.concat(secondNumber))];
})

const sum = numberArray.reduce((n, sum) => {
    return sum + n
}, 0)

console.log(sum)