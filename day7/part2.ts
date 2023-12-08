import * as fs from 'fs';

interface IHand {
    cards: string,
    bid: number,
    type: number,
    cardValues: number[]
}

const file = fs.readFileSync('day7/input.txt', 'utf8');

let hands: IHand[] = []

let numberArray: number[] = [];

file.split(/\r?\n/).forEach((line, y) => {

    const lineSplit = line.split(" ");
    hands = [...hands, { cards: lineSplit[0], bid: parseInt(lineSplit[1]), type: getHandType(lineSplit[0]), cardValues: lineSplit[0].split("").map(getCardValue) }]
})

hands.sort(compareHands)

function compareHands(a: IHand, b: IHand) {

    if (b.type !== a.type) {
        return b.type - a.type;
    }

    for(let i = 0; i < a.cardValues.length; i++){
        if(a.cardValues[i] == b.cardValues[i]){
            continue;
        }

        return a.cardValues[i] - b.cardValues[i]
    }

    return 0;
}

function getHandType(hand: string) {

    const jokers = hand.match(/J/g).length;
    const sortedHand = hand.split("").map(c => getCardValue(c)).sort()

    // Five of a kind
    if (hand.match(getRegularExpression(5, jokers))) {
        return 0;
    }

    // Four of a kind
    if (hand.match(getRegularExpression(4, jokers))) {
        return 1;
    }

    // Full house
    if (hand.match(/^(.)(?=.*\1)\1*(.)(?=.*\2)(?:\1|\2)+$/)) {
        return 2;
    }

    // Three of a kind
    if (hand.match(getRegularExpression(3, jokers))) {
        return 3;
    }

    // Two pair
    if (hand.match(getRegularExpression(5, jokers))?.length ?? 0 > 2) {
        return 4;
    }

    // One pair
    if (hand.match(getRegularExpression(2, jokers))) {
        return 5;
    }

    // High card
    return 6;
}

function hasNumbers(targetCount: number, numbers: number[]){
    
}

function getRegularExpression(targetAmount: number, jokers: number){
    if(targetAmount - jokers <= 0){
        return new RegExp(`.`);
    }

    if(targetAmount - jokers <= 1){
        return new RegExp(`[^J]`);
    }

    return new RegExp(`([^J])(?=.${".*\\1".repeat(targetAmount-jokers)}`);
}

function getCardValue(card: string) {
    switch (card) {
        case "A":
            return 14;
        case "K":
            return 13;
        case "Q":
            return 12;
        case "T":
            return 10;
        case "J":
            return 0;
        default:
            return parseInt(card);
    }
}

const sum = hands.reduce((sum, hand, index) => {
    return sum + hand.bid * (index + 1)
}, 0)

console.log(sum)