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
            PrintNodes(){
                for (let i = 0; i< this.nodes.length; i++)
                    for (let k = 0; k < this.nodes[i].length; k++)
                        console.log(String.fromCharCode(97 + i) + " " + String.fromCharCode(this.nodes[i][k].name + 97) + " " + this.nodes[i][k].weight);
                console.log();
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
                this.round = [];
            }

            push(pathnode, round){
                let last = false;
                for (let i = 0; i < this.queue.length; i++){
                    if(this.queue[i].weight > pathnode.node.weight && this.round[i] >= round){
                        this.queue.splice(i,0,pathnode);
                        this.round.splice(i,0,round);
                        last = true;
                        break;
                    }
                }
                if(!last){
                    this.queue.push(pathnode);
                    this.round.push(round);
                    }
            }

            pop(){
                if(this.queue.length > 0) {
                    this.round.shift();
                    return this.queue.shift();
                }
                else
                    console.log("Underflow");
            }
            print(){
                for (let i = 0; i < this.queue.length; i++){
                    console.log("Priority queue: " + this.queue[i].name);
                }
            }
        }

        class NodePath{
            constructor(node, prev, weight){
                this.node = node;
                this.prev = prev;
                this.totalweight = weight;
            }

        }