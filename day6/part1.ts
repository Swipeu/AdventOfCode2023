import * as fs from 'fs';

const file = fs.readFileSync('day6/input.txt', 'utf8');

let numberArray: number[] = [];

let times: number[]
let distances: number[]

const fileSplit = file.split(/\r?\n/);

times = fileSplit[0].split(":")[1].trim().split(" ").filter(s => s.length > 0).map(s => parseInt(s))
distances = fileSplit[1].split(":")[1].trim().split(" ").filter(s => s.length > 0).map(s => parseInt(s))

for(let raceIndex = 0; raceIndex < times.length; raceIndex++){
    const time = times[raceIndex];
    const distance = distances[raceIndex];
    let waysToWin = 0;
    for(let heldTime = 0; heldTime < time; heldTime++){
        if(heldTime *  (time - heldTime) <= distance){
            continue;
        }
        waysToWin++;
    }
    numberArray = [...numberArray, waysToWin]
}

const sum = numberArray.reduce((n, sum) => {
    return sum * n
}, 1)

console.log(sum)