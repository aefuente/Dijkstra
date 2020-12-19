public class Vis {
    View view;

    Vis(View v){
        view = v;
    }

    void play(){
        Dijkstra d = new Dijkstra(view.model.graph.nodes.size());
        d.setView(view);
        d.ShortestPath(view.model.graph.nodes, view.model.graph.start);
    }

}
