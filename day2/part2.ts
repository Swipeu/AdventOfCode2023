import * as fs from 'fs';

const file = fs.readFileSync('day2/input.txt', 'utf8');

let numberArray: number[] = [];

file.split('\n').forEach(line => {

    const gameSplit = line.split(":");

    let setPower = 0;
    let minRed: number = 0, minGreen: number = 0, minBlue: number = 0;
    gameSplit[1].split(";").forEach(set => {
        set.split(",").forEach(pair => {
            const pairSplit = pair.trim().split(" ")
            const amount = parseInt(pairSplit[0])
            const color = pairSplit[1];

            switch (color) {
                case "red":
                    minRed = Math.max(amount, minRed)
                    break;
                case "green":
                    minGreen = Math.max(amount, minGreen)
                    break;
                case "blue":
                    minBlue = Math.max(amount, minBlue)
                    break;
            }
        })
    })
    
    setPower = minRed * minGreen * minBlue
    numberArray = [...numberArray, setPower]
})

const sum = numberArray.reduce((n, sum) => {
    return sum + n
}, 0)

console.log(sum)