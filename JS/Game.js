class Visualize{
    constructor(v){
        this.view = v;
        this.anim = false;
        this.pathanim = false;
        this.visual = [[]];
        this.setcount = 0;
        this.ncount = 0;
        this.first = true;
        this.dpath = [];
    }
    start(){
        this.anim = true;
        let d = new Dijkstra(this.view.model.graph.nodes.length);
        this.visual = d.ShortestPath(this.view.model.graph.nodes, this.view.model.graph.start.charCodeAt(0) -97, this.view.model.graph.end.charCodeAt(0) - 97);
        this.dpath = d.getPath(this.view.model.graph.start.charCodeAt(0) -97, this.view.model.graph.end.charCodeAt(0) - 97);
    }

    play(){
        if(this.first){
            this.view.model.Circles[this.view.model.graph.start.charCodeAt(0)-97].setRed();
            this.first = false;
        }
        else if(this.ncount < this.visual[this.setcount].length) {
            this.view.model.NeighborVis(this.visual[this.setcount][this.ncount]);
            this.ncount++;
        }
        else if (this.setcount + 1 < this.visual.length){
            this.setcount++;
            this.ncount = 0;
            this.view.model.SettledVis(this.visual[this.setcount][this.ncount]);
            this.ncount++;
        }
        else{
            this.first = false;
            this.pathanim = true;
            this.anim = false;
        }

    }
    path(){
        this.view.model.Clear(this.visual);
        this.view.model.PathVis(this.dpath);
        console.log("here");
    }
}

function onClick(event){
    console.log("Clicks");
    game.animate.view.model.update(event.pageX - game.animate.view.canvas.offsetLeft, event.pageY - game.animate.view.canvas.offsetTop)
    if (game.animate.view.model.animate === true)
        game.animate.start();
}

class Controller{
    constructor(v){
        this.animate = v;
        this.animate.view.canvas.addEventListener("click", onClick, true);
    }

    remove(){
        console.log("Quiting");
        this.animate.view.canvas.removeEventListener("click", onClick, true);
    }

    update(){

    }
}


class View {
    constructor(m){
        this.model = m;
        this.canvas = document.getElementById("myCanvas");
    }

    update(){
        let ctx = this.canvas.getContext("2d");
        ctx.rect(0,0,1000,500);
        ctx.fillStyle = 'rgb(210,180,140)';
        ctx.fill();

        for (let i = 0; i < this.model.Lines.length; i++){
            let line = this.model.Lines[i];
            ctx.beginPath();
            ctx.moveTo(line.x1, line.y1);
            ctx.lineTo(line.x2,line.y2);
            ctx.strokeStyle = line.color;
            ctx.stroke();
            ctx.font = '12px serif';
            ctx.fillStyle = 'rgb(0,0,0)';
            ctx.fillText(line.weight,line.txtcords[0]-3,line.txtcords[1]+3);
        }


        for (let i = 0; i < this.model.Circles.length; i++){
            let circle = this.model.Circles[i];
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, 25, 0, 2 *Math.PI, false);
            ctx.fillStyle = circle.color;
            ctx.strokeStyle = 'rgb(0,0,0)';
            ctx.stroke();
            ctx.fill();
            ctx.font = '12px serif';
            ctx.fillStyle = 'rgb(0,0,0)';
            ctx.fillText(circle.name,circle.x-3,circle.y+3);
        }
    }
}

class Game{
    constructor(){
        this.model = new Model();
        this.view = new View(this.model);
        this.animate = new Visualize(this.view);
        this.controller = new Controller(this.animate);
    }

    sleep(milli){
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++){
            if((new Date().getTime() - start) > milli){
                break;
            }
        }
    }

    onTimer(){
        if(this.animate.anim === true) {
            this.animate.play();
            this.sleep(30);
        }
        else if(this.animate.pathanim === true){
            this.animate.path();

            this.animate.pathanim = false;
        }
        this.controller.update();
        this.view.update();
    }
}
let start = true;
let game = new Game();
let timer = setInterval(function() { game.onTimer(); }, 60);

function Start(){
    if (start === true) {
        document.getElementById("start").innerHTML = "Reset";
        game.model.ending = true;
        start = false;
    }
    else{
        game.controller.remove();
        game = new Game();
        //timer = setInterval(function() { game.onTimer(); }, 60);
        start = true;
        document.getElementById("start").innerHTML = "Start Dijkstras!";
    }
}