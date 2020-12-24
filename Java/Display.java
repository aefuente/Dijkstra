import javax.naming.ldap.Control;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.Random;


public class Display {

    class Controller implements MouseListener {
        Vis anim;

        Controller(Vis v) {
            anim = v;
        }


        @Override
        public void mousePressed(MouseEvent e) {
            anim.view.model.update(e.getX(), e.getY() - 25);
            anim.view.repaint();
            if(anim.view.model.animate){
                 anim.play();
            }
        }

        @Override
        public void mouseReleased(MouseEvent e) { }
        @Override
        public void mouseClicked(MouseEvent e) { }
        @Override
        public void mouseEntered(MouseEvent e) { }
        @Override
        public void mouseExited(MouseEvent e) { }

    }


    public class Window extends JFrame {
        Controller controller;
        Model model;
        View view;
        Vis anim;

        public Window() {
            this.setTitle("Dijkstra's");
            this.setSize(500, 500);

            model = new Model();
            view = new View(model);
            anim = new Vis(view);
            controller = new Controller(anim);

            this.getContentPane().add(view);
            this.addMouseListener(controller);
            this.setFocusable(true);
            this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            this.setVisible(true);
        }


    }

}