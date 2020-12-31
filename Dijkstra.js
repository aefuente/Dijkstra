class Dijkstra {
    constructor(size){
        // The size is the total number of lines added to the graph. Each "line" is added twice, one forwards, then backwards.
        this.size = size;
        // For keeping track of animation
        this.settledvis = [];
        // Holds the shortest distance by location example. (index = 0 : a, index = 1, b etc.)
        this.dist = [];
        // A set that holds which nodes have been set, no node is set twice unless it's already in the pq.
        this.settled = new Set();
        // The priority queue prioritises the lower weight nodes first
        this.pq = new PriorityQueue();
        // Holds the graph.
        this.adj = [[]];
    }


    Dijkstra(adj,src, end){
        // Assigns the graph to adj.
        this.adj = adj;

        // Adjust the distance size setting all nodes to infinity.
        for (let i = 0; i < this.size; i++)
            this.dist.push(Number.MAX_SAFE_INTEGER)
        // Pushes the first node source node onto the priority queue.
        this.pq.push(new NodePath(new Node(src,0), null, 0));
        // The distance of the first node to itself is always zero.
        this.dist[src] = 0;

        // I decided to stop Dijkstras after the node was found and after the priority queue no longer had that item in it.
        // This allows for the user to make a bit more mistakes when creating graphs.
        while(!this.settled.has(end) || this.pq.has(end)){
            // Pops the node from the priority queue.
            let node = this.pq.pop();
            // Priority queue returns -1 if underflow.
            if(node === -1)
                break;

            let name = node.node.name;
            // The 0 index of every subarray is going to be the "set" color.
            this.settledvis.push([]);
            this.settledvis[this.settledvis.length-1].push(node);
            // Adds the settled node to the settled set.
            this.settled.add(parseInt(name,10));
            // Looks at the settled neighbors adjacent nodes.
            this.Neighbours(node);
        }
    }


    Neighbours(parent){
        let weightDistance = -1;
        let newDistance = -1;
        // We set the previous node to the parent so afterwords we can backtrack to find the path.
        let prev = parent;
        // Iterate through every adjacent node to the parent.
        for (let i = 0; i < this.adj[parent.node.name].length; i++){

            let child = this.adj[parent.node.name][i];
            if (!this.settled.has(child.name)){
                // Calculate the new distances
                weightDistance = child.weight;
                newDistance = this.dist[parent.node.name] + weightDistance;

                // If the new distance is shorter than the previous distance set the new distance
                if(newDistance < this.dist[child.name])
                    this.dist[child.name] = newDistance;
                // Add this to the visualization array.
                let tmp = new NodePath(child,prev, this.dist[child.name]);
                tmp.setTotalWeight(prev.totalweight + child.weight);
                this.settledvis[this.settledvis.length-1].push(tmp);

                // Push this node onto the priority queue to be set.
                this.pq.push(tmp);
            }
        }


    }


    getPath(start, end){
        let back = null;
        let path = [];
        // Searches for the ending node and when it was set.
        for (let i = 0; i < this.settledvis.length; i++){
                if (this.settledvis[i][0].node.name === end && this.settledvis[i][0].totalweight === this.dist[end]){
                    back = this.settledvis[i][0];
                    break;
            }
        }
        // Back tracks from the ending node to find the path.
        if(back != null) {
            path.push(back);
            while (back.prev != null) {
                path.push(back.prev);
                back = back.prev;
            }
        }
        return path;
    }

    getAllDist(){
        return this.dist;
    }

    // Return the animation.
    ShortestPath(graph, start, end){
        this.Dijkstra(graph, start, end);
        return this.settledvis;
    }
}