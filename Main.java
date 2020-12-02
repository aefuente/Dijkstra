import java.util.*;

class DijkstraPQ{
    int dist[];
    private Set<Integer> settled;
    private PriorityQueue<Node> pq;
    private int vert;
    List<List<Node>> adj;

    public DijkstraPQ(int vert){
        this.vert = vert;
        dist = new int[vert];
        settled = new HashSet<Integer>();
        pq = new PriorityQueue<Node>(vert,new Node());
    }
    public void Dijkstra(List<List<Node>> adj, int src){
        this.adj = adj;
        for (int i = 0; i < vert; i++)
            dist[i] = Integer.MAX_VALUE;

        pq.add(new Node(src, 0));

        dist[src] = 0;

        while (settled.size() != vert){

            int u = pq.remove().name;

            settled.add(u);

            Neighbours(u);
        }

    }

    private void Neighbours(int u){
        int weightDistance = -1;
        int newDistance = -1;

        for (int i = 0; i < adj.get(u).size(); i++){
            Node v = adj.get(u).get(i);

            if (!settled.contains(v.name)){
                weightDistance = v.weight;
                newDistance = dist[u] + weightDistance;

                if(newDistance < dist[v.name])
                    dist[v.name] = newDistance;
                pq.add(new Node(v.name, dist[v.name]));
            }

        }
    }

}


class Node implements Comparator<Node>{
  int name;
  int weight;
  Node(){
  }

  Node(int name, int weight){
      this.name = name;
      this.weight = weight;
  }

    @Override
    public int compare(Node o1, Node o2) {
        if (o1.weight < o2.weight)
            return -1;
        if (o1.weight > o2.weight)
            return 1;
        return 0;
    }
};

class Nodes{
    public
    char start= ' ';
    char end = ' ';
    // We have max 10 nodes and 9 connections perNode;
    List<List<Node>> graph = new ArrayList<List<Node>>();
    Nodes(){
        //for (int i = 0; i < GRAPH_SIZE; i ++)
        graph.add(new ArrayList<Node>());

    }


    boolean createNode(int origin, int destination, int weight){
        while(origin >= graph.size()-1 || destination >= graph.size() -1)
            graph.add(new ArrayList<Node>());

        graph.get(origin).add(new Node(destination, weight));
        graph.get(destination).add(new Node(origin, weight));

        return true;
    }

    void PrintNodes(){
        for (int i = 0; i < graph.size(); i ++)
            for (int k = 0; k < graph.get(i).size(); k++)
                    System.out.println((char)('a' + i) + " " + (char)(graph.get(i).get(k).name + 'a') + " " + graph.get(i).get(k).weight + " ");
        System.out.println();
    }
    void ShortestPath(){
        //int V = graph.size();
        int V =  graph.size()-1;
        System.out.println(graph.size());
        int source = start - 'a';
        DijkstraPQ dpq = new DijkstraPQ(V);
        dpq.Dijkstra(graph, source);
        System.out.println("The shortest path from node : ");
        for (int i = 1; i < dpq.dist.length; i ++)
            System.out.println((char)(source + 'a') + " to " + (char)(i + 'a') + " is "  + dpq.dist[i]);
    }


}





public class Main {
    public static void main(String[] args) {
        Display frame = new Display();
        Display.Window window = frame.new Window();
    }
}
