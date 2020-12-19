import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

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
            System.out.println("Painting: ");
            model.Circles[i].Draw(g);
            this.add(model.Circles[i].text);
        }
    }


}
