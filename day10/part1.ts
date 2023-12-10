import * as fs from 'fs';

const file = fs.readFileSync('day10/input.txt', 'utf8');

const pipeDirections: Map<string, number[]> = new Map();
pipeDirections.set("S", [0, 1, 2, 3])
pipeDirections.set(".", [])
pipeDirections.set("|", [0, 2])
pipeDirections.set("-", [1, 3])
pipeDirections.set("L", [0, 1])
pipeDirections.set("J", [0, 3])
pipeDirections.set("7", [2, 3])
pipeDirections.set("F", [1, 2])

class Node{
    id: string;
    x: number;
    y: number;

    pipe: string;

    connectedNodes: Set<Node> = new Set();

    constructor(x: number, y: number, pipe: string){
        this.id = getId(x, y);
        this.x = x;
        this.y = y;
        this.pipe = pipe;
    }

    setupConnections(){
        let nighborNodeIds: string[] = []
        if(this.x === 24 && this.y === 75){
            let tes = 0;
        }
        pipeDirections.get(this.pipe).forEach(n => {
            switch(n){
                case 0:
                    nighborNodeIds.push(getId(this.x, this.y - 1));
                    break;
                case 1:
                    nighborNodeIds.push(getId(this.x + 1, this.y));
                    break;
                case 2:
                    nighborNodeIds.push(getId(this.x, this.y + 1));
                    break;
                case 3:
                    nighborNodeIds.push(getId(this.x - 1, this.y));
                    break;
            }
        })

        nighborNodeIds.forEach(id => {
            const node = nodes.get(id)
            if(node === undefined){
                return;
            }
            this.connectedNodes.add(node);
        })
    }

    filterOutConnections(){
        if(this.pipe === "S"){
            let test = 0;
        }
        this.connectedNodes.forEach((n, index, object) => {
            if(n.connectedNodes.has(this)){
                return;
            }
            object.delete(n)
        });
    }
}

function getId(x: number, y: number){
    return `${x} ${y}`
}

const nodes: Map<string, Node> = new Map();
let startNode: Node;
let numberArray: number[] = [];

file.split(/\r?\n/).forEach((line, y) => {
    line.split("").forEach((pipe, x) => {
        const newNode = new Node(x, y, pipe)
        if(pipe === "S"){
            startNode = newNode
        }
        nodes.set(newNode.id, newNode);
    });
})

nodes.forEach(n => n.setupConnections())
nodes.forEach(n => n.filterOutConnections())

let currentNode = Array.from(startNode.connectedNodes)[0];

let traversedNodes: Set<Node> = new Set();
traversedNodes.add(startNode)
traversedNodes.add(currentNode)

while(true){
    let nextNode: Node | undefined;
    currentNode.connectedNodes.forEach(n => {
        if(traversedNodes.has(n)){
            return;
        }
        nextNode = n
    })

    if(!nextNode){
        break;
    }
    currentNode = nextNode;
    traversedNodes.add(nextNode);
}
// const sum = numberArray.reduce((n, sum) => {
//     return sum + n
// }, 0)

console.log(traversedNodes.size / 2)
