class Visualize{
    constructor(v){
        // Holds the view component
        this.view = v;

        // Dijkstra animation notifier
        this.danimation = false;
        // Path animation notifier
        this.pathanimation = false;

        // Holds the Dijkstra animation sequence
        this.visual = [[]];

        // Keeps track of the nodes set
        this.setcount = 0;

        // Keeps track of the neighbor nodes
        this.ncount = 0;
        // Holds the optimal distance to all nodes
        this.distance = [];
        // Keeps track if the algorithm has run.
        this.setD = false;

        // Keeps error checking from running dijkstras twice on first path.
        this.init = true;

        // Get the animation going.
        this.first = true;

        // Holds the path to highlight green
        this.dpath = [];
    }

    dijkstra(){
        // Notifies the game that the dijkstras animation is ready.
        this.danimation = true;

        // If dijkstras has already ran and set a node it is not recalled.
        if(this.setD === false) {
            this.d = new Dijkstra(this.view.model.graph.nodes.length);
            this.visual = [];
            this.visual = this.d.ShortestPath(this.view.model.graph.nodes, this.view.model.graph.start, this.view.model.graph.end);
            this.setD = true;
        }
        // prints the distances to nodes below the graph.
        this.distance = this.d.getAllDist();
        let list =  document.getElementById("distance");
        list.innerHTML = "";
        for (let i = 0; i < this.distance.length; i++) {
            if(this.distance[i] !== Number.MAX_SAFE_INTEGER && this.d.settled.has(i)) {
                let entry = document.createElement('li');
                entry.appendChild(document.createTextNode(String.fromCharCode(this.view.model.graph.start + 97) + " to " + String.fromCharCode(i+97)+ ": " + this.distance[i]));
                list.append(entry);
            }
        }

        // Stores the path from starting to ending node.
        this.dpath = this.d.getPath(this.view.model.graph.start, this.view.model.graph.end);

    }

    start(){
        // Runs dijkstras
        this.dijkstra();
        // Reruns the dijkstras algorithm if the first run didn't settled that node.
        if (this.dpath.length === 0 && !this.init) {
            this.setD = false;
            this.dijkstra();
        }
        this.init = false;
    }

    /*
    Canvases in java don't update until all previous processes are done. So I was not able to just run the algorithm, and update the screen as i went along.
    To fix this I created a way to store the Dijkstras steps in a way that was easy to implement. The first item in the each array of the 2d matrix was the one
    that was being settled by dijkstras, and the subsequent ones after that were the child nodes that were being checked. So from Game.js I can just keep calling play
    and each time it will update the model and return so that we can see each individual step of dijkstras.
    */
    play(){
        if(this.first){
            this.view.model.SettledVis(this.visual[0][0]);
            this.ncount++;
            this.first = false;
        }
        // The adjacent nodes are set here.
        else if(this.setcount < this.visual.length && this.ncount < this.visual[this.setcount].length) {
            this.view.model.NeighborVis(this.visual[this.setcount][this.ncount]);
            this.ncount++;
        }
        // The settled nodes are set here.
        else if (this.setcount + 1 < this.visual.length){
            this.setcount++;
            this.ncount = 0;
            this.view.model.SettledVis(this.visual[this.setcount][this.ncount]);
            this.ncount++;
        }
        // This is the end of our animation, so we notify our dijkstra animation is finished and we should show the green path.
        else{
            this.first = false;
            this.pathanimation = true;
            this.danimation = false;
        }

    }
    // Sets the path green.
    path(){
        this.view.model.Clear(this.visual);
        this.view.model.PathVis(this.dpath);
    }
}