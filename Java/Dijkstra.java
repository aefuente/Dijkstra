import java.util.HashSet;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Set;


public class Dijkstra {
    int dist[];
    private Set<Integer> settled;
    private PriorityQueue<Node> pq;
    private int vert;
    List<List<Node>> adj;

    View view;

    public Dijkstra(int vert){
        this.vert = vert-1;
        dist = new int[this.vert];
        settled = new HashSet<Integer>();
        pq = new PriorityQueue<Node>(vert,new Node());
    }

    public void setView(View v){
        this.view = v;
    }

    public void Dijkstra(List<List<Node>> adj, int src){
        this.adj = adj;
        for (int i = 0; i < vert; i++)
            dist[i] = Integer.MAX_VALUE;

        pq.add(new Node(src, 0));

        dist[src] = 0;

        while (settled.size() != vert){
            Node v = pq.remove();
            int u = v.name;
            settled.add(u);
            System.out.println("settled : " + (char)(v.name + 'a'));
            Neighbours(u);
        }

    }

    private void Neighbours(int u){
        int weightDistance = -1;
        int newDistance = -1;
        // Iterates through connecting nodes
        for (int i = 0; i < adj.get(u).size(); i++){
            Node v = adj.get(u).get(i);
            v.PrintNode();
            if (!settled.contains(v.name)){
                weightDistance = v.weight;
                newDistance = dist[u] + weightDistance;

                if(newDistance < dist[v.name])
                    dist[v.name] = newDistance;
                pq.add(new Node(v.name, dist[v.name]));
            }
        }

    }

    void ShortestPath(List<List<Node>> graph, char start){
        int source = 'a' - start;
        Dijkstra(graph, source);
        System.out.println("The shortest path from node : ");
        for (int i = 0; i < dist.length; i ++)
            System.out.println((char)(source + 'a') + " to " + (char)(i + 'a') + " is "  + dist[i]);
    }
}


