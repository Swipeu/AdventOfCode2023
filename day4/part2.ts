import * as fs from 'fs';

const file = fs.readFileSync('day4/input.txt', 'utf8');

let numberArray: number[] = [];

let queuedCards: number[] = [];


file.split(/\r?\n/).forEach((line, cardIndex) => {

    const idSplit = line.split(":")

    const cardId = idSplit[0].split(" ")[1]

    let cardCopies = 1

    if(queuedCards.length > 0){
        cardCopies = cardCopies + queuedCards[0]
    }

    numberArray = [...numberArray, cardCopies]

    queuedCards.shift();

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

    for(let i = 0; i < cardCopies; i++){
        for(let j = 0; j < myWinningNumbers.length; j++){
            if(j >= queuedCards.length){
                queuedCards.push(1);
                continue;
            }

            queuedCards[j] = queuedCards[j] + 1;
        }
    }
})

const sum = numberArray.reduce((n, sum) => {
    return sum + n
}, 0)

console.log(sum)