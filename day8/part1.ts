import * as fs from 'fs';

class Node{
    id: string;
    parents: string[] = [];
    left?: string;
    right?: string;
    
    constructor(nodeData: string[]){
        this.id = nodeData[0];

        this.left = nodeData[1];
        this.right = nodeData[2];
    }

    addParent(parent: string){
        this.parents = [...this.parents, parent]
    }

    getChildNode(direction: string){
        switch(direction){
            case "R":
                return this.right;
            case "L":
                return this.left;
        }
    }
}

const file = fs.readFileSync('day8/input.txt', 'utf8');

let nodes: Map<string, Node> = new Map();
let path: string = "";
let numberArray: number[] = [];

let startNode: Node | undefined;
let endNode: Node | undefined; 

file.split(/\r?\n/).forEach((line, y) => {
    if(y === 0){
        path = line;
        return;
    }

    const nodeData = line.match(/\w{3}/g);
    if(nodeData?.length !== 3){
        return;
    }
    
    nodes.set(nodeData[0], new Node(nodeData));
})

startNode = nodes.get("AAA")
endNode = nodes.get("ZZZ")

// nodes.forEach((n) => {
//     if(n.left){
//         nodes.get(n.left).addParent(n.id);
//     }
//     if(n.right){
//         nodes.get(n.right).addParent(n.id);
//     }
// })

let currentNode = startNode;

let pathLength = 0;
while(currentNode !== endNode){
    let nextNode = currentNode.getChildNode(path[pathLength % path.length]);
    currentNode = nodes.get(nextNode)
    pathLength++;
}

console.log(pathLength)