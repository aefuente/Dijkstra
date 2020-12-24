class Dijkstra {
    constructor(vert){
        this.path = [];
        this.vert = vert-1;
        this.settledvis = [];
        this.dist = [];
        this.round = 0;
        this.settled = new Set();
        this.pq = new PriorityQueue();
        this.adj = [[]];
        this.prev = null;
    }

    // Figure out a way to make previous point to the proper node.
    Dijkstra(adj,src){

        this.adj = adj;
        for (let i = 0; i < this.vert; i++)
            this.dist.push(Number.MAX_SAFE_INTEGER)
        this.pq.push(new NodePath(new Node(src,0), null, 0));
        this.dist[src] = 0;
        while(this.settled.size !== this.vert){
            let v = this.pq.pop();
            let u = v.node.name;
            this.settledvis.push([]);
            this.settledvis[this.round].push(v);
            //console.log("Setting " + String.fromCharCode(v.name + 97ß) + " Weight " +v.weight );
            this.settled.add(parseInt(u,10));
            this.Neighbours(v);
            this.round++;
        }
    }


    Neighbours(u){
        let weightDistance = -1;
        let newDistance = -1;
        let prev = u;
        for (let i = 0; i < this.adj[u.node.name].length; i++){
            let v = this.adj[u.node.name][i];

            if (!this.settled.has(v.name)){
                //console.log("Checking " + String.fromCharCode(v.name + 97) + " Weight " + v.weight);
                weightDistance = v.weight;
                newDistance = this.dist[u.node.name] + weightDistance;

                if(newDistance < this.dist[v.name])
                    this.dist[v.name] = newDistance;
                let tmp = new NodePath(v,prev, newDistance);
                this.settledvis[this.round].push(tmp);
                this.pq.push(tmp, this.round);
            }
        }
    }

    getPath(start, end){
        let back;
        console.log("Searching weight: " + this.dist[end]);
        for (let i = 0; i < this.settledvis.length; i++){
            for (let j = 0; j < this.settledvis[i].length; j++){
                if (this.settledvis[i][j].node.name === end && this.settledvis[i][j].totalweight === this.dist[end]){
                    back = this.settledvis[i][j];
                    i = this.settledvis.length;
                    break;
                }
            }
        }
        console.log("Array: ");
        for (let i = 0; i < this.settledvis.length; i++){
            for (let j = 0; j < this.settledvis[i].length; j++){
                console.log(String.fromCharCode(this.settledvis[i][j].node.name + 97) + " Total weight: " + this.settledvis[i][j].totalweight);

            }
            console.log("new line");
        }
        console.log("Path: ");
        this.path.push(back);
        console.log(String.fromCharCode(back.node.name +97));
        while(back.prev != null){
            this.path.push(back.prev);
            console.log(String.fromCharCode(back.prev.node.name +97));
            back = back.prev;
        }
    }

    ShortestPath(graph, start, end){
        let source = start;
        this.Dijkstra(graph, source);
        console.log("the shortest path from node : ");
        for (let i = 0; i < this.dist.length; i++){
            console.log(String.fromCharCode(source + 97) + " to " + String.fromCharCode(i + 97)  + " is " + this.dist[i]);
        }
        this.getPath(start,end);
        return this.settledvis;
    }
}