import * as fs from 'fs';

const file = fs.readFileSync('day5/input.txt', 'utf8');

let numberArray: number[] = [];

let seedArray: number[] = [];

// let seedToSoil: Map<number, number> = new Map();
// let SoilToFertilizer: Map<number, number> = new Map();
// let fertilizerToWater: Map<number, number> = new Map();
// let waterToLight: Map<number, number> = new Map();
// let lightToTemperature: Map<number, number> = new Map();
// let teamperatureToHumidity: Map<number, number> = new Map();
// let humidityToLocation: Map<number, number> = new Map();

interface RangeDefinition {
    sourceStart: number,
    destinationStart: number,
    length: number,
}

let seedToSoil: RangeDefinition[] = [];
let SoilToFertilizer: RangeDefinition[] = [];
let fertilizerToWater: RangeDefinition[] = [];
let waterToLight: RangeDefinition[] = [];
let lightToTemperature: RangeDefinition[] = [];
let teamperatureToHumidity: RangeDefinition[] = [];
let humidityToLocation: RangeDefinition[] = [];

let rangeCollectionIndex = -1;
let rangeCollections = [seedToSoil, SoilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, teamperatureToHumidity, humidityToLocation]

function TryGetModifiedNumber(number: number, range: RangeDefinition){
    if(number < range.sourceStart || number > range.sourceStart + range.length){
        return undefined;
    }

    return range.destinationStart + number - range.sourceStart;
}

file.split(/\r?\n/).forEach((line, index) => {
    if (index === 0) {

        seedArray = line.split(":")[1].trim().split(" ").map(s => parseInt(s));
        return;
    }

    if (line.split(":").length > 1) {
        rangeCollectionIndex++;
        return;
    }

    if(rangeCollectionIndex < 0){
        return;
    }

    let numbers = line.trim().split(" ").map(n => parseInt(n))

    if(numbers.length !== 3){
        return;
    }

    rangeCollections[rangeCollectionIndex] = [...rangeCollections[rangeCollectionIndex], { sourceStart: numbers[1], destinationStart: numbers[0], length: numbers[2]}];
})

let lowestLocation: number = undefined;

seedArray.forEach(seed => {
    let currentNumber = seed;
    rangeCollections.forEach(c => {
        let pendingNumber = undefined;
        c.forEach(r => {
            let tempNumber = TryGetModifiedNumber(currentNumber, r);
            if(tempNumber === undefined){
                return;
            }
            pendingNumber = tempNumber
        })

        if(pendingNumber === undefined){
            return;
        }
        currentNumber = pendingNumber;
    })

    lowestLocation = lowestLocation === undefined ? currentNumber : Math.min(currentNumber, lowestLocation);
})

// const sum = numberArray.reduce((n, sum) => {
//     return sum + n
// }, 0)

console.log(lowestLocation)