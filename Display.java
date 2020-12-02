import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Random;
import java.util.concurrent.*;


public class Display {
        Semaphore update = new Semaphore(1);
        class Controller implements MouseListener {
            Model model;
            View view;

            Controller(Model m, View v) {
                model = m;
                view = v;
            }

            @Override
            public void mousePressed(MouseEvent e) {
                model.onclick(e.getX(), e.getY() - 25);
                update.release();
            }

            @Override
            public void mouseReleased(MouseEvent e) { }
            @Override
            public void mouseClicked(MouseEvent e) { }
            @Override
            public void mouseEntered(MouseEvent e) {}
            @Override
            public void mouseExited(MouseEvent e) { }


        }

        public class Circle {
            int x, y, clickcount;
            char name;
            Color color;
            JLabel text;

            Circle(int x, int y, int count) {
                this.x = x;
                this.y = y;
                this.clickcount = 0;
                color = new Color(0, 0, 0);
                name = (char) ('a' + count);
                text = new JLabel("name");
                text.setText(Character.toString(name));
                text.setBounds(x - 5, y - 5, 10, 10);

            }

            void Draw(Graphics g) {
                if (clickcount == 0) {
                    color = new Color(0, 255, 255);
                } else
                    color = new Color(255, 100, 0);
                g.setColor(color);
                g.fillOval(x - 25, y - 25, 50, 50);
            }
        }

        public class Line {
            int x1, y1, x2, y2;
            int weight;
            Color color;
            JLabel weight_text;
            char[] connects;

            Line(int x1, int y1, int x2, int y2, int weight) {
                this.x1 = x1;
                this.y1 = y1;
                this.x2 = x2;
                this.y2 = y2;
                // Change weight
                Random random = new Random();
                this.weight = Math.abs(random.nextInt()) % 50 + 1;
                connects = new char[2];
                setTextBounds();
            }

    /*

    This is probably my favorite method in the program. Essentially its goal is to set the text bound so that the weight text is
    all ways displayed underneath the line, 15 pixels away.

     */

            void setTextBounds() {
                double x;
                double y;
                double slope;
                double slopeinv;
                double intercept;
                int[] midpoint = new int[2];
                midpoint[0] = (x2 + x1) / 2;
                midpoint[1] = -(y2 + y1) / 2;
                // Finds the slop of the original line
                if (x2 > x1)
                    slope = -((double) y2 - (double) y1) / ((double) x2 - (double) x1);
                else
                    slope = -((double) y1 - (double) y2) / ((double) x1 - (double) x2);
                // Calculates the inverse
                slopeinv = -Math.pow(slope, -1);

                // Solves the intercept of the line that is perpendicular to the line we drew
                intercept = midpoint[1] - (slopeinv * midpoint[0]);

                // Ensure we don't have a flat line
                if (Double.isInfinite(slopeinv)) {
                    x = midpoint[0];
                    y = midpoint[1] - 15;
                    // This is where the fun begins. Given we have solved for the line that intersects our drawn line, we just need to solve for x and we are
                    // able to produce y. To do this I created an equation of a circle. I solved the systems of equations between the circle and the "imaginary"
                    // to solve for x. Once x is solved for we can just plug it into our imaginary line equation and we have x and y.

                    // I can probably reduce a lot of this overhead by just using a ratio of the slope applied to the x and y cords.
                } else {
                    double a = (1 + (slopeinv * slopeinv));
                    double b = (-(2 * midpoint[0]) + (2 * slopeinv * intercept) - (2 * midpoint[1] * slopeinv));
                    double c = (Math.pow(midpoint[0], 2) + Math.pow(intercept, 2) + Math.pow(midpoint[1], 2) - (2 * intercept * midpoint[1]) - 225);
                    double quadratic = Math.sqrt(Math.pow(b, 2) - (4 * a * c));
                    if (midpoint[0] > 250) {
                        x = (-b + quadratic) / (2 * a);
                        y = -((slopeinv * x) + intercept);
                    } else {
                        x = (-b - quadratic) / (2 * a);
                        // A short fix until i adjust the numbers to print from the middle.
                        y = -((slopeinv * x) + intercept) - 7;
                        x = x - 5;
                    }
                }
                // Sets the text color to black
                color = new Color(0, 0, 0);
                weight_text = new JLabel("Weight");
                weight_text.setText(Integer.toString(weight));
                weight_text.setBounds((int) x, (int) y, 40, 15);
                weight_text.setBackground(new Color(255, 255, 255));
                weight_text.setOpaque(false);
            }

            void Draw(Graphics g) {
                g.setColor(color);
                g.drawLine(x1, y1, x2, y2);
            }
        }

        public class Model {
            int MAP_SIZE;
            Circle[] Circles;
            Line[] Lines;
            Nodes Graph;
            int count;
            int lncount;
            boolean ending;

            Model() {
                count = 0;
                lncount = 0;
                MAP_SIZE = 10;
                Circles = new Circle[MAP_SIZE];
                ending = false;
                Lines = new Line[90];
                Graph = new Nodes();
            }

            boolean DirectCollision(Circle circle, int x, int y) {
                if (25 > Math.pow(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2), .5)) {
                    circle.clickcount++;
                    return true;
                }
                return false;
            }

            boolean OverLapCollision(Circle circle, int x, int y) {
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

                String weight = "0";
                Lines[lncount] = new Line(Circles[num1].x, Circles[num1].y, Circles[num2].x, Circles[num2].y, Integer.parseInt(weight));
                Lines[lncount].connects[0] = Circles[num1].name;
                Lines[lncount].connects[1] = Circles[num2].name;
                Circles[num1].clickcount = 0;
                Circles[num2].clickcount = 0;

                Graph.createNode(Circles[num1].name, Circles[num2].name, Lines[lncount].weight);
                Graph.PrintNodes();
                lncount++;
            }

            public void onclick(int x, int y){
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
                        if(Graph.start == ' ')
                            Graph.start = Circles[i].name;
                        else {
                            Graph.end = Circles[i].name;
                            System.out.println("start: " + Graph.start + " End: " + Graph.end);

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
                    Circles[count] = new Circle(x, y, count);
                    count++;
                }
            }
        }


        public class View extends JPanel {
            Model model;

            //FontMetrics metrics;
            View(Model m) {
                this.setLayout(null);
                model = m;
                MakeButton();

            }


            public void MakeButton() {
                JButton b;
                b = new JButton("Select Start and end");
                b.setBounds(300, 425, 200, 50);
                this.add(b);
                b.addActionListener(new ActionListener() {
                    @Override
                    public void actionPerformed(ActionEvent e) {
                        model.ending = true;
                    }
                });

            }

            public void paintComponent(Graphics g) {
                //metrics = g.getFontMetrics();

                for (int i = 0; i < model.lncount; i++) {
                    model.Lines[i].Draw(g);
                    //model.Lines[i].width = metrics.stringWidth(Integer.toString(model.Lines[i].weight));
                    this.add(model.Lines[i].weight_text);
                }
                for (int i = 0; i < model.count; i++) {
                    model.Circles[i].Draw(g);
                    this.add(model.Circles[i].text);
                }
            }


        }


        public class Window extends JFrame {
            Controller controller;
            Model model;
            View view;

            public Window() {
                this.setTitle("Dijkstra's");
                this.setSize(500, 500);

                model = new Model();
                view = new View(model);
                controller = new Controller(model, view);

                this.getContentPane().add(view);
                this.addMouseListener(controller);
                this.setFocusable(true);
                this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                this.setVisible(true);
            }

            void run() {
                while (true) {
                    System.out.println("Updated");
                    //controller.update();
                    view.repaint();
                    try {
                        update.acquire();
                    } catch (Exception e) {
                        e.printStackTrace();
                        System.out.println("Error on screen refresh... Exiting...");
                        System.exit(1);
                    }
                }
            }
        }

    }