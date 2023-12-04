import * as fs from 'fs';

const file = fs.readFileSync('day4/input.txt', 'utf8');

let numberArray: number[] = [];

file.split(/\r?\n/).forEach((line, y) => {

    const idSplit = line.split(":")

    const cardId = idSplit[0].split(" ")[1]

    const numberSplit = idSplit[1].split("|");

    const winningNumbers = numberSplit[0].trim().split(" ").filter(s => s.length > 0)
    const myNumbers = numberSplit[1].trim().split(" ").filter(s => s.length > 0)

    let myWinningNumbers: string[] = []
    winningNumbers.forEach(n => {
        if(!myNumbers.includes(n)){
            return;
        }

        myWinningNumbers = [...myWinningNumbers, n]
    })

    if(myWinningNumbers.length === 0){
        return;
    }
    numberArray = [...numberArray, Math.pow(2, myWinningNumbers.length - 1)]
})

const sum = numberArray.reduce((n, sum) => {
    return sum + n
}, 0)

console.log(sum)