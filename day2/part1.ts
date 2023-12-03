import * as fs from 'fs';

const file = fs.readFileSync('day2/input.txt', 'utf8');

const bag: any = {
    red: 12,
    green: 13,
    blue: 14
}

let numberArray: number[] = [];

file.split('\n').forEach(line => {

    const gameSplit = line.split(":");
    const gameId = parseInt(gameSplit[0].split(" ")[1])

    let hasInvalidAmount = false;
    gameSplit[1].split(";").forEach(set => {
        set.split(",").forEach(pair => {
            const pairSplit = pair.trim().split(" ")
            const amount = parseInt(pairSplit[0])
            const color = pairSplit[1];
            if(amount > bag[color]){
                hasInvalidAmount = true;
            }
        })
    })

    if(hasInvalidAmount){
        return;
    }
    numberArray = [...numberArray, gameId]
})

const sum = numberArray.reduce((n, sum) => {
    return sum + n
}, 0)

console.log(sum)