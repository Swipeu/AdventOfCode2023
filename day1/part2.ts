import * as fs from 'fs';

const file = fs.readFileSync('day1/input.txt','utf8');

const validNumbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

let numberArray: number[] = []; 

let newFile = "";
file.split('\n').forEach((line, index) => {
    let firstNumber: string | undefined;
    let secondNumber: string | undefined;

    let currentString: string = "";

    for (let i = 0; i < line.length; i++) {
        const number = parseInt(line[i]);

        if(Number.isNaN(number)){
            currentString += line[i];

            for(let j = 1; j <= validNumbers.length; j++){
                if(!currentString.includes(validNumbers[j-1])){
                    continue;
                }
                
                firstNumber = j.toString();
                break;
            }

            if(firstNumber !== undefined)
                break;

            continue;
        }
        
        firstNumber = line[i];
        break;
    }
        
    currentString = "";
    
    for (let i = line.length - 1; i >= 0; i--) {
        const number = parseInt(line[i]);

        if(Number.isNaN(number)){
            currentString = line[i] + currentString;

            for(let j = 1; j <= validNumbers.length; j++){
                if(!currentString.includes(validNumbers[j-1])){
                    continue;
                }

                secondNumber = j.toString();
                break;
            }

            if(secondNumber !== undefined)
                break;

            continue;
        }

        secondNumber =  line[i];
        break;
    }

    if(firstNumber === undefined || secondNumber === undefined)
        return;
    
    numberArray = [...numberArray, parseInt(firstNumber.concat(secondNumber))];
})

const sum = numberArray.reduce((sum, n) => {
    return sum + n
}, 0)

console.log(sum)