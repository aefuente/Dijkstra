class Dijkstra {
    constructor(vert){
        this.vert = vert-1;
        this.settledvis = [];
        this.dist = [];
        this.round = 0;
        this.settled = new Set();
        this.pq = new PriorityQueue();
        this.adj = [[]];
        this.prev = null;
    }


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
                weightDistance = v.weight;
                newDistance = this.dist[u.node.name] + weightDistance;

                if(newDistance < this.dist[v.name])
                    this.dist[v.name] = newDistance;
                this.settledvis[this.round].push(new NodePath(v,prev, prev.totalweight + v.weight));
                //this.pq.push(new NodePath(v,prev, this.dist[v.name], this.round));
                this.pq.push(new NodePath(v,prev, this.dist[v.name]));
            }
        }
    }


    getPath(start, end){
        let back;
        let path = [];
        console.log("Searching weight: " + this.dist[end]);
        for (let i = 0; i < this.settledvis.length; i++){
                if (this.settledvis[i][0].node.name === end && this.settledvis[i][0].totalweight === this.dist[end]){
                    back = this.settledvis[i][0];
                    break;
            }
        }

        console.log("Path: ");
        path.push(back);
        console.log(String.fromCharCode(back.node.name +97));
        while(back.prev != null){
            path.push(back.prev);
            console.log(String.fromCharCode(back.prev.node.name +97));
            back = back.prev;
        }
        return path;
    }

    ShortestPath(graph, start, end){
        let source = start;
        this.Dijkstra(graph, source);
        console.log("the shortest path from node : ");
        for (let i = 0; i < this.dist.length; i++){
            console.log(String.fromCharCode(source + 97) + " to " + String.fromCharCode(i + 97)  + " is " + this.dist[i]);
        }
        return this.settledvis;
    }
}