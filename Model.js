class Model {
    constructor() {
        // The maximum number of circles
        this.MAP_SIZE = 50;
        // Counts the number of circles created.
        this.count = 0;
        // Holds the circles
        this.Circles = [];
        // Notifies the model that we want to select a beginging and ending node.
        this.ending = false;
        // Holds the lines
        this.Lines = [];
        this.lncount = 0;
        // Graph is created once we select the start and end nodes.
        this.graph = new Graph();
        // Notifies the game when we want to begin the animation.
        this.animate = false;
    }
    // Detects if the user clicks on the node
    DirectCollision(circle, x, y) {
        if (25 > Math.pow(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2), .5)) {
            // Keeps track of how many times a circle has been clicked
            circle.clickcount++;
            // Shows the user that the circle has been selected.
            circle.setOrange();
            return true;
        }
        return false;
    }

    // Detects if the user tries to create another circle that overlaps with one already placed.
    OverLapCollision(circle, x, y) {
        return 50 > Math.pow(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2), .5);
    }

    // Either attempts to draw a circle or to select the starting and ending points.
    update(x, y) {
        if (!this.ending)
            this.DrawCircle(x, y);
        else
            this.setStartEnd(x, y);
    }

    // runs through all of the weight lines and creates the nodes in "graph"
    createGraph(){
        for (let i = 0; i < this.Lines.length; i++){
            if (!this.isNull(this.Lines[i])){
                this.graph.createNode(this.Lines[i].connects[0], this.Lines[i].connects[1], this.Lines[i].weight);
            }
        }
    }

    // Assings the starting and ending values to the graph.
    setStartEnd(x, y) {
        let collision = false;
        for (let i = 0; i < this.Circles.length; i++) {
            // Some array positions are null if they are deleted
            if (!this.isNull(this.Circles[i])) {
                // If collision
                if (this.DirectCollision(this.Circles[i], x, y)) {
                    // Increase the click count and flag that there was a collision
                    this.Circles[i].clickcount++;
                    collision = true;
                    // If the graph's start isn't set, set it.
                    if (this.graph.start === -1)
                        this.graph.start = this.Circles[i].name;
                    // If the graph's start is set, set the end.
                    else {
                        this.graph.end = this.Circles[i].name;
                        // If the graph hasn't been created yet, create the graph.
                        if(!this.graph.set) {
                            this.createGraph();
                            this.graph.set = true;
                        }
                        // Notify the game that we are ready to begin dijkstras
                        this.animate = true;
                    }
                }
            }
        }

        // If the collision was not detected remove click counts.
        if (!collision)
            for (let i = 0; i < this.Circles.length; i++)
                if(!this.isNull(this.Circles[i]))
                    this.Circles[i].clickcount = 0;
    }

    // Draws lines between circles.
    DrawLine() {
        let num1 = -1;
        let num2 = -1;
        for (let i = 0; i < this.Circles.length; i++) {
            if(!this.isNull(this.Circles[i])) {
                // Scans to see which circle was clicked first
                if (this.Circles[i].clickcount !== 0 && num1 === -1)
                    num1 = i;
                // Scans to see which circle was clicked second
                else if (this.Circles[i].clickcount !== 0)
                    num2 = i;
            }
        }
        // If both num1 and num2 are set. create a new line.
        if (num1 !== -1 && num2 !== -1) {
            this.Lines[this.lncount] = (new Line(this.Circles[num1].x, this.Circles[num1].y, this.Circles[num2].x, this.Circles[num2].y))

            this.Lines[this.lncount].connects[0] = this.Circles[num1].name;
            this.Lines[this.lncount].connects[1] = this.Circles[num2].name;

            // Reset the circles click count
            this.Circles[num1].clickcount = 0;
            this.Circles[num2].clickcount = 0;

            // Add 1 to line count
            this.lncount++;

            // Set the circles back to blue.
            this.resetBlue();

        }

    }

    // Returns true if an item is either null or undefined
    isNull(item){
        if(item === null)
            return true;
        else if (item === undefined)
            return true;
        return false;
    }

    // Finds the missing circle id (ex: say we have [a,b,c] and we remove a. This function returns [0] so the next circle we place will be an "a".
    findEmpty(){
        for (let i = 0; i < this.Circles.length; i++){
            if(this.Circles[i] === null)
                return i;
        }
        return this.Circles.length;
    }
    // Removes the lines connected to a circle after it has been deleted.
    removeAdjLines(circle){
        for (let i = 0; i < this.lncount; i++){
            if (this.Lines[i] !== null && (this.Lines[i].connects[0] === circle.name || this.Lines[i].connects[1] === circle.name)){
                // All deleted circles and nodes are just set to null
                this.Lines[i] = null;
            }
        }
    }

    // Draws a circle on screen when a user clicks.
    DrawCircle(x, y) {
        let collision = false;
        for (let i = 0; i < this.Circles.length; i++) {
            // Detects if there is a collision between circles
            if (!this.isNull(this.Circles[i])) {
                if (this.DirectCollision(this.Circles[i], x, y)) {
                    // If there is a collision attempt to draw a line
                    this.DrawLine();
                    // Note there has been a collision
                    collision = true;
                    // If the circle that has been clicked twice remove the circle and connecting lines
                    if (this.Circles[i].clickcount >= 2) {
                        this.removeAdjLines(this.Circles[i]);
                        this.Circles[i] = null;
                        this.count--;
                    }
                    // Doesn't allow a circles to be drawn that overlap each other
                } else if (this.OverLapCollision(this.Circles[i], x, y)) {
                    collision = true;
                }
            }
        }
        // If there has been no collision reset the click counts and set all circles back to blue
        if (!collision)
            this.resetBlue();
        // IF there has been no collision add a circle
        if (this.count < this.MAP_SIZE && !collision) {
            let index = this.findEmpty();
            this.Circles[index] = new Circle(x, y, index);
            this.count++;
        }
    }

    // Sets circle clickcounts to zero and sets all circles back to blue
    resetBlue(){
        for (let i = 0; i < this.Circles.length; i++) {
            if (!this.isNull(this.Circles[i])) {
                this.Circles[i].clickcount = 0;
                this.Circles[i].setBlue();
            }
        }
    }

    // Function used to set circle colors
    CircleColor(node, color) {
        for (let i = 0; i < this.Circles.length; i++) {
            if (!this.isNull(this.Circles[i]) && node.node.name === this.Circles[i].name) {
                if (color === 'r')
                    this.Circles[i].setRed();
                else if (color === 'b')
                    this.Circles[i].setDarkBlue();
                else if (color === 'g')
                    this.Circles[i].setGreen();
            }
        }
    }
    // Used to set line colors
    LineColor(node, color) {
        for (let i = 0; i < this.Lines.length; i++) {

            let be = null;
            let to = node.node.name;
            if (node.prev != null)
                be = node.prev.node.name;
            if (this.Lines[i] != null && be != null && (this.Lines[i].connects[0] === to || this.Lines[i].connects[1] === to) && (this.Lines[i].connects[0] === be || this.Lines[i].connects[1] === be))
                if (color === 'r')
                    this.Lines[i].setRed();
                else if (color === 'b')
                    this.Lines[i].setDarkBlue();
                else if (color === 'g')
                    this.Lines[i].setGreen();

        }
    }

    // Sets Lines/Circles red
    SettledVis(node) {
        this.CircleColor(node, 'r');
        this.LineColor(node, 'r');
    }
    // Sets Lines/Circles blue
    NeighborVis(node) {
        this.CircleColor(node, 'b');
        this.LineColor(node, 'b');

    }

    // Sets path green
    PathVis(path) {
        for (let i = 0; i < path.length; i++) {
            this.CircleColor(path[i], 'g');
            this.LineColor(path[i], 'g');
        }
    }
    // Sets nodes red.
    Clear(settled) {
        for (let i = 0; i < settled.length; i++){
            this.CircleColor(settled[i][0], 'r');
            this.LineColor(settled[i][0], 'r');
        }
    }
}