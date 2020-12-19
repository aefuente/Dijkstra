import javax.swing.*;
import java.awt.*;
import java.util.Random;

public class Shapes {

    public static class Line {
        int x1, y1, x2, y2;
        int weight;
        Color color;
        JLabel weight_text;
        char[] connects;

        Line(int x1, int y1, int x2, int y2) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            // Change weight
            Random random = new Random();
            this.weight = Math.abs(random.nextInt()) % 20 + 1;
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
            weight_text.setBounds((int) x, (int) y, 40, 20);
            weight_text.setBackground(new Color(255, 255, 255));
            weight_text.setOpaque(false);
        }


        void Draw(Graphics g) {
            g.setColor(color);
            g.drawLine(x1, y1, x2, y2);
        }
    }

    public static class Circle {
        int x, y, clickcount;
        char name;
        Color color;
        JLabel text;
        Circle(int x, int y, int count) {
            this.x = x;
            this.y = y;
            this.clickcount = 0;
            color = new Color(0, 255, 255);
            name = (char) ('a' + count);
            text = new JLabel("name");
            text.setText(Character.toString(name));
            text.setBounds(x - 5, y - 10, 10, 20);
        }
        void SetRed(){
            color = new Color(255, 0,0);
        }

        void SetOrange(){
            color = new Color(255,100,0);
        }

        void Draw(Graphics g) {
            if (clickcount == 0) {
                //color = new Color(0, 255, 255);
            }


            g.setColor(color);
            g.fillOval(x - 25, y - 25, 50, 50);
        }
    }
}
