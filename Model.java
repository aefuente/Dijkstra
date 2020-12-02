public class Model {
    public int MAP_SIZE = 10;
    Shapes.Circle[] Circles;
    Shapes.Line[] Lines;
    Graph graph;
    int count;
    int lncount;
    boolean ending;


    Model() {
        count = 0;
        lncount = 0;
        Circles = new Shapes.Circle[MAP_SIZE];
        ending = false;
        Lines = new Shapes.Line[90];
        graph = new Graph();
    }


    boolean DirectCollision(Shapes.Circle circle, int x, int y) {
        if (25 > Math.pow(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2), .5)) {
            circle.clickcount++;
            return true;
        }
        return false;
    }


    boolean OverLapCollision(Shapes.Circle circle, int x, int y) {
        return 50 > Math.pow(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2), .5);
    }


    void DrawLine() {

        int num1 = -1;
        int num2 = -1;
        for (int i = 0; i < count; i++) {
            if (Circles[i].clickcount != 0 && num1 == -1) {
                num1 = i;
            } else if (Circles[i].clickcount != 0) {
                num2 = i;
            }
        }
        if (num1 == -1 || num2 == -1)
            return;

        Lines[lncount] = new Shapes.Line(Circles[num1].x, Circles[num1].y, Circles[num2].x, Circles[num2].y);
        Lines[lncount].connects[0] = Circles[num1].name;
        Lines[lncount].connects[1] = Circles[num2].name;
        Circles[num1].clickcount = 0;
        Circles[num2].clickcount = 0;

        graph.createNode(Circles[num1].name - 'a', Circles[num2].name - 'a', Lines[lncount].weight);
        lncount++;
    }


    public void update(int x, int y){
        if(ending){
            SetStartEnd(x,y);
        }
        else{
            DrawCircle(x,y);
        }
    }


    public void SetStartEnd(int x, int y){
        boolean collision = false;
        for (int i = 0; i < count; i++) {
            if (DirectCollision(Circles[i], x, y)) {
                Circles[i].clickcount++;
                collision = true;
                if(graph.start == ' ')
                    graph.start = Circles[i].name;
                else {
                    graph.end = Circles[i].name;
                    System.out.println("start: " + graph.start + " End: " + graph.end);
                    Dijkstra dijkstra = new Dijkstra(graph.nodes.size()-1);
                    dijkstra.ShortestPath(graph.nodes, graph.start);
                }
            }
        }
        if (!collision)
            for (int i = 0; i < count; i++)
                Circles[i].clickcount = 0;
    }


    public void DrawCircle(int x, int y) {
        boolean collision = false;
        for (int i = 0; i < count; i++) {
            if (DirectCollision(Circles[i], x, y)) {
                DrawLine();
                collision = true;
                if (Circles[i].clickcount >= 2) {
                    for (int j = i; j < count - 1; j++)
                        Circles[j] = Circles[j + 1];
                    count--;
                }
            }
            if (OverLapCollision(Circles[i], x, y))
                collision = true;
        }
        if (!collision)
            for (int i = 0; i < count; i++)
                Circles[i].clickcount = 0;
        if (count < MAP_SIZE && !collision) {
            Circles[count] = new Shapes.Circle(x, y, count);
            count++;
        }
    }
}