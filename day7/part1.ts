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

    // Five of a kind
    if (hand.match(/(.)\1{4}/)) {
        return 0;
    }

    // Four of a kind
    if (hand.match(/(.)(?=.*\1.*\1.*\1)/)) {
        return 1;
    }

    // Full house
    if (hand.match(/^(.)(?=.*\1)\1*(.)(?=.*\2)(?:\1|\2)+$/)) {
        return 2;
    }

    // Three of a kind
    if (hand.match(/(.)(?=.*\1.*\1)/)) {
        return 3;
    }

    // Two pair
    if ((hand.match(/(.)(?=.*\1)/g)?.length ?? 0) > 1) {
        return 4;
    }

    // One pair
    if (hand.match(/(.)(?=.*\1)/)) {
        return 5;
    }

    // High card
    return 6;
}

function getCardValue(card: string) {
    switch (card) {
        case "A":
            return 14;
        case "K":
            return 13;
        case "Q":
            return 12;
        case "J":
            return 11;
        case "T":
            return 10;
        default:
            return parseInt(card);
    }
}

const sum = hands.reduce((sum, hand, index) => {
    return sum + hand.bid * (index + 1)
}, 0)

console.log(sum)