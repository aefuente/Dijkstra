// What dijkstra's reads
class Graph {
    constructor(){
        this.start = -1;
        this.end = -1;
        this.nodes = [];
        this.nodes.push([]);
        this.set = false;
    }
    // Creates nodes going forwards and backwards (ex: a -> b and b -> a)
    createNode(origin, destination, weight){

        while(origin >= this.nodes.length || destination >= this.nodes.length){
            this.nodes.push([]);
        }
        this.nodes[origin].push(new Node(destination, weight));
        this.nodes[destination].push(new Node(origin, weight));

    }
}

class Node {
    constructor(name, weight) {
        this.name = name;
        this.weight = weight;
    }
}

class NodePath{
    constructor(node, prev, weight){
        // Sets the current node
        this.node = node;
        // Holds the previous NodePath
        this.prev = prev;
        // This total weight and short weight seems redundant, but short weight is used in Dijkstra's,
        // while total weight is used in the animation.
        this.shortweight = weight;
        this.totalweight = 0;
    }
    setTotalWeight(weight){
        this.totalweight = weight;
    }
}

// Priorities shortest path nodes first
class PriorityQueue{
    constructor(){
        this.queue = [];
    }

    // Adds to the priority queue
    push(pathnode){
        let last = false;
        for (let i = 0; i < this.queue.length; i++){
            // If new node is smaller than an item in the priority queue insert in front
            if(this.queue[i].weight > pathnode.node.weight){
                this.queue.splice(i,0,pathnode);
                last = true;
                break;
            }
        }
        // If it is the largest node add to the end
        if(!last){
            this.queue.push(pathnode);
        }
    }

    // Remove the first node in the priority queue and shift everything over.
    pop(){
        if(this.queue.length > 0) {
            return this.queue.shift();
        }
        // Return -1 if underflow
        else {
            console.log("Underflow");
            return -1;
        }
    }
    // Checks to see if the priority queue has an item
    has(end){
        for (let i = 0; i < this.queue.length; i++){
            if(end === this.queue[i].node.name)
                return true;
        }
        return false;
    }
}
