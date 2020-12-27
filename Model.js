class Model {
    constructor() {
        this.MAP_SIZE = 50;
        this.count = 0;
        this.Circles = [];
        this.ending = false;
        this.Lines = [];
        this.lncount = 0;
        this.graph = new Graph();
        this.animate = false;
    }

    DirectCollision(circle, x, y) {
        if (25 > Math.pow(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2), .5)) {
            circle.clickcount++;
            circle.setOrange();
            return true;
        }
        return false;
    }

    OverLapCollision(circle, x, y) {
        return 50 > Math.pow(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2), .5);
    }

    update(x, y) {
        if (!this.ending)
            this.DrawCircle(x, y);
        else
            this.setStartEnd(x, y);
    }

    setStartEnd(x, y) {
        let collision = false;
        for (let i = 0; i < this.Circles.length; i++) {
            if (this.DirectCollision(this.Circles[i], x, y)) {
                this.Circles[i].clickcount++;
                collision = true;
                if (this.graph.start === ' ')
                    this.graph.start = this.Circles[i].name;
                else {
                    this.graph.end = this.Circles[i].name;
                    console.log("start: " + this.graph.start + " End: " + this.graph.end)
                    console.log("Graph Size: " + this.graph.nodes.length)
                    this.animate = true;
                }
            }
        }
        if (!collision)
            for (let i = 0; i < this.Circles.length; i++)
                this.Circles[i].clickcount = 0;
    }

    DrawLine() {
        let num1 = -1;
        let num2 = -1;
        for (let i = 0; i < this.Circles.length; i++) {
            if (this.Circles[i].clickcount !== 0 && num1 === -1)
                num1 = i;
            else if (this.Circles[i].clickcount !== 0)
                num2 = i;
        }
        if (num1 !== -1 && num2 !== -1) {
            this.Lines[this.lncount] = (new Line(this.Circles[num1].x, this.Circles[num1].y, this.Circles[num2].x, this.Circles[num2].y))

            this.Lines[this.lncount].connects[0] = this.Circles[num1].name;
            this.Lines[this.lncount].connects[1] = this.Circles[num2].name;
            this.Circles[num1].clickcount = 0;
            this.Circles[num2].clickcount = 0;
            this.graph.createNode((this.Circles[num1].name).charCodeAt(0) - 97, (this.Circles[num2].name).charCodeAt(0) - 97, this.Lines[this.lncount].weight)
            this.lncount++;
            for (let i = 0; i < this.Circles.length; i++) {
                this.Circles[i].setBlue();
            }

        }

    }

    DrawCircle(x, y) {
        let collision = false;
        for (let i = 0; i < this.count; i++) {
            if (this.DirectCollision(this.Circles[i], x, y)) {
                this.DrawLine();
                collision = true;
                if (this.Circles[i].clickcount >= 2) {
                    for (let j = i; j < this.count - 1; j++)
                        this.Circles[j] = this.Circles[j + 1]
                    this.count--;
                }
            } else if (this.OverLapCollision(this.Circles[i], x, y)) {
                collision = true;
            }
        }
        if (!collision)
            for (let i = 0; i < this.count; i++) {
                this.Circles[i].clickcount = 0;
                this.Circles[i].setBlue();
            }
        if (this.count < this.MAP_SIZE && !collision) {
            this.Circles[this.count] = new Circle(x, y, this.count);
            this.count++;
        }
    }

    CircleColor(node, color) {
        for (let i = 0; i < this.Circles.length; i++) {
            if (this.Circles[i] != null && String.fromCharCode(node.node.name + 97) === this.Circles[i].name) {
                if (color === 'r')
                    this.Circles[i].setRed();
                else if (color === 'b')
                    this.Circles[i].setDarkBlue();
                else if (color === 'g')
                    this.Circles[i].setGreen();
            }
        }
    }

    LineColor(node, color) {
        for (let i = 0; i < this.Lines.length; i++) {

            let be = null;
            let to = String.fromCharCode(node.node.name + 97);
            if (node.prev != null)
                be = String.fromCharCode(node.prev.node.name + 97);
            if (this.Lines[i] != null && be != null && (this.Lines[i].connects[0] === to || this.Lines[i].connects[1] === to) && (this.Lines[i].connects[0] === be || this.Lines[i].connects[1] === be))
                if (color === 'r')
                    this.Lines[i].setRed();
                else if (color === 'b')
                    this.Lines[i].setDarkBlue();
                else if (color === 'g')
                    this.Lines[i].setGreen();

        }
    }

    SettledVis(node) {
        this.CircleColor(node, 'r');
        this.LineColor(node, 'r');
    }

    NeighborVis(node) {
        this.CircleColor(node, 'b');
        this.LineColor(node, 'b');

    }


    PathVis(path) {
        for (let i = 0; i < path.length; i++) {
            this.CircleColor(path[i], 'g');
            this.LineColor(path[i], 'g');
        }
    }

    Clear(settled) {
        for (let i = 0; i < settled.length; i++){
            for (let j = 0; j < settled[i].length; j ++){
                console.log(settled[i][j].node.name);

                if(settled[i][j].node.name !== undefined) {
                    this.CircleColor(settled[i][j], 'r');
                    this.LineColor(settled[i][j], 'r');
                }




            }
        }
    }
}