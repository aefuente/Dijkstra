class Graph {
            constructor(){
                this.start = ' ';
                this.end = ' ';
                this.nodes = [[]];
                this.nodes.push([]);
            }

            createNode(origin, destination, weight){
                while(origin >= this.nodes.length-1 || destination >= this.nodes.length-1){
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


    class PriorityQueue{
        constructor(){
            this.queue = [];
        }

        push(pathnode){
            let last = false;
            for (let i = 0; i < this.queue.length; i++){
                if(this.queue[i].weight > pathnode.node.weight){
                    this.queue.splice(i,0,pathnode);
                    last = true;
                    break;
                }
            }
            if(!last){
                this.queue.push(pathnode);
            }
        }

        pop(){
            if(this.queue.length > 0) {
                return this.queue.shift();
            }
            else
                console.log("Underflow");
        }
    }

    class NodePath{
        constructor(node, prev, weight){
            this.node = node;
            this.prev = prev;
            this.totalweight = weight;
        }

}