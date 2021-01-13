class View {
    constructor(m){
        this.model = m;
        this.canvas = document.getElementById("myCanvas");
    }

    update(){
        let ctx = this.canvas.getContext("2d");
        // Canvas size
        let w = window.innerWidth- 400 - 500;
        if(w < 650)
            w = 650;
        document.getElementById("myCanvas").setAttribute("width",w.toString());
        ctx.rect(0,0,w,500);


        // Draws the lines
        for (let i = 0; i < this.model.Lines.length; i++){
            let line = this.model.Lines[i];
            // Some lines are set to null if they are deleted so we don't draw them.
            if (line !== null) {
                ctx.beginPath();
                ctx.moveTo(line.x1, line.y1);
                ctx.lineTo(line.x2, line.y2);
                ctx.strokeStyle = line.color;
                ctx.stroke();
                ctx.font = '12px serif';
                ctx.fillStyle = 'rgb(0,0,0)';
                ctx.fillText(line.weight, line.txtcords[0] - ctx.measureText(line.weight.toString()).width/2, line.txtcords[1] + 6);
            }
        }

        // Draws the circles
        for (let i = 0; i < this.model.Circles.length; i++){
            let circle = this.model.Circles[i];
            // Some circles are set to null if they are deleted so we don't draw them.
            if(circle !== null) {
                ctx.beginPath();
                ctx.arc(circle.x, circle.y, 25, 0, 2 * Math.PI, false);
                ctx.fillStyle = circle.color;
                ctx.strokeStyle = 'rgb(0,0,0)';
                ctx.stroke();
                ctx.fill();
                ctx.font = '12px serif';
                ctx.fillStyle = 'rgb(0,0,0)';
                ctx.fillText(String.fromCharCode(circle.name + 97), circle.x - 3, circle.y + 3);
            }
        }
    }
}
