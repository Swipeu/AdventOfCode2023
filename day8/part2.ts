import * as fs from 'fs';

class Node{
    id: string;
    parents: string[] = [];
    leftId: string;
    rightId: string;

    leftNode: Node;
    rightNode: Node;

    isStartNode: boolean;
    isEndNode: boolean;

    loopLength: number;
    
    constructor(nodeData: string[]){
        this.id = nodeData[0];

        this.leftId = nodeData[1];
        this.rightId = nodeData[2];

        switch(nodeData[0][2]){
            case "A":
                this.isStartNode = true;
                break;
            case "Z":
                this.isEndNode = true;
                break;
        }
    }

    connectNodes(){
        this.leftNode = nodes.get(this.leftId)
        this.rightNode = nodes.get(this.rightId)
    }

    calculateDistances(){
        if(!this.isStartNode){
            return;
        }

        let currentNode: Node = this;
        let pathIndex = 0;

        while(!currentNode.isEndNode){
            currentNode = currentNode.getChildNode(path[pathIndex % path.length]);
            pathIndex++;
            this.loopLength = pathIndex;
        }
    }

    getChildNode(direction: number){
        switch(direction){
            case 0:
                return this.leftNode;
            case 1:
                return this.rightNode;
        }
    }
}

const file = fs.readFileSync('day8/input.txt', 'utf8');

let nodes: Map<string, Node> = new Map();
let startNodes: Node[] = [];
let path: number[] = [];
let numberArray: number[] = [];

file.split(/\r?\n/).forEach((line, y) => {
    if(y === 0){
        path = line.split("").map(c => c === "R" ? 1 : 0);
        return;
    }

    const nodeData = line.match(/\w{3}/g);
    if(nodeData?.length !== 3){
        return;
    }
    
    let newNode = new Node(nodeData);
    nodes.set(nodeData[0], newNode);

    if(newNode.isStartNode){
        startNodes.push(newNode);
    }
})

nodes.forEach(n => n.connectNodes())
nodes.forEach(n => n.calculateDistances())
startNodes.sort((n1, n2) => {
    return n2.loopLength - n1.loopLength;
})
let currentSteps = 0;
startNodes.forEach((n, index) => {
    if(index === 0){
        currentSteps = n.loopLength;
        return;
    }

    let offset = currentSteps % n.loopLength;
    let previousLoop = currentSteps;
    while(offset != 0){
        currentSteps += previousLoop;
        offset = currentSteps % n.loopLength;
    }

    // let offset = startNodes[index].loopLength - startNodes[index - 1].loopLength;

    // let loops = 1;
    // while(offset != 0){
    //     offset += startNodes[index - 1].loopLength
    //     offset = startNodes[index].loopLength % offset;
    //     loops++;
    // }
});

console.log(currentSteps)