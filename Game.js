
// Tells the model where the user clicked and passes the information.
// If the model sets animate to true that means the user is ready to watch the animation.
function onClick(event){
    game.controller.animate.view.model.update(event.pageX - game.controller.animate.view.canvas.offsetLeft, event.pageY - game.controller.animate.view.canvas.offsetTop)
    if (game.controller.animate.view.model.animate === true) {
        game.controller.animate.start();
    }
}

class Controller{
    // Creates the event listener.
    constructor(v){
        this.animate = v;
        this.animate.view.canvas.addEventListener("click", onClick, true);
    }
    // Removes the event listener so that the garbage collector can delete the old game.
    remove(){
        this.animate.view.canvas.removeEventListener("click", onClick, true);
    }

}

class Game{
    constructor(){
        this.controller = new Controller(new Visualize(new View(new Model())));
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
        // Plays Dijkstra animation
        if(this.controller.animate.danimation === true) {
            this.controller.animate.play();
            this.sleep(30);
        }
        // Shows the green path
        else if(this.controller.animate.pathanimation === true){
            this.controller.animate.path();

            this.controller.animate.pathanimation = false;
        }

        this.controller.animate.view.update();
    }
}
// Create a boolean variable for start/reset button
let start = true;

// Creates the new game
let game = new Game();

// Sets the frame rate of the screen
let timer = setInterval(function() { game.onTimer(); }, 60);

function Start(){
    //Start button is clicked.
    if (start === true) {
        // Change start button to reset.
        document.getElementById("start").innerHTML = "Reset";
        // Notify the model we are ending.
        game.controller.animate.view.model.ending = true;
        // Changes button functionality to reset the graph.
        start = false;
    }
    else{
        // Removes the old event listener so the garbage collector can delete the old game.
        game.controller.remove();
        // Creates a new game.
        game = new Game();
        document.getElementById("distance").innerHTML = "";
        start = true;
        document.getElementById("start").innerHTML = "Start Dijkstras!";
    }
}