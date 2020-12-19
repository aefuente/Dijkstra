import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Graph {
    char start= ' ';
    char end = ' ';
    // We have max 10 nodes and 9 connections perNode;
    List<List<Node>> nodes = new ArrayList<List<Node>>();
    Graph(){
        //for (int i = 0; i < GRAPH_SIZE; i ++)
        nodes.add(new ArrayList<Node>());
    }


    void createNode(int origin, int destination, int weight){
        while(origin >= nodes.size()-1 || destination >= nodes.size() -1)
            nodes.add(new ArrayList<Node>());

        nodes.get(origin).add(new Node(destination, weight));
        nodes.get(destination).add(new Node(origin, weight));
    }

    void PrintNodes(){
        for (int i = 0; i < nodes.size(); i ++)
            for (int k = 0; k < nodes.get(i).size(); k++)
                System.out.println((char)('a' + i) + " " + (char)(nodes.get(i).get(k).name + 'a') + " " + nodes.get(i).get(k).weight + " ");
        System.out.println();
    }
}


class Node implements Comparator<Node> {
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

    void PrintNode(){
        System.out.println("Node name: " + (char)(name + 'a') + " Weight: " + weight);
    }
}
