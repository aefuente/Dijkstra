import java.util.*;

class DijkstraPQ{
    private int dist[];
    private Set<Character> settled;
    private PriorityQueue<Node> pq;
    private int vert;

    public DijkstraPQ(int vert){
        this.vert = vert;
        dist = new int[vert];
        settled = new HashSet<Character>();
        pq = new PriorityQueue<Node>(vert,new Node());
    }
    public void Dijkstra(Node[][] adj, char src){

    }

}


class Node implements Comparator<Node>{
  char next;
  int weight;
  Node(){
  }

  Node(char name, int weight){
      next = name;
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
    private final
    int GRAPH_SIZE = 10;
    int CONNECTIONS = 9;
    public
    char start= ' ';
    char end = ' ';
    // We have max 10 nodes and 9 connections perNode;
    Node[][] graph = new Node[10][9];
    Nodes(){
        for (int i = 0; i < GRAPH_SIZE; i ++)
            for (int k = 0; k < CONNECTIONS; k++)
                graph[i][k] = null;
    }


    boolean createNode(char origin, char destination, int weight){
        for (int i = 0; i < CONNECTIONS; i ++) {
            if (graph[origin - 'a'][i] == null) {
                graph[origin - 'a'][i] = new Node(destination, weight);
                break;
            }
        }
        for (int i = 0; i < CONNECTIONS; i ++) {
            if (graph[destination - 'a'][i] == null) {
                graph[destination - 'a'][i] = new Node(origin, weight);
                break;
            }
        }

        return true;
    }

    void PrintNodes(){
        for (int i = 0; i < GRAPH_SIZE; i ++)
            for (int k = 0; k < CONNECTIONS; k++)
                if (graph[i][k] != null) {
                    System.out.println((char)('a' + i) + " " + graph[i][k].next + " " + graph[i][k].weight + " ");
                }
        System.out.println();
    }


}



public class Main {
    public static void main(String[] args) {
        Display frame = new Display();
        Display.Window window = frame.new Window();
    }
}
