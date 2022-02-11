import javax.swing.JFrame;

public class Main {

  public static void main(String[] args) {
    JFrame jFrame = new JFrame("DOOM Fire");
    jFrame.setResizable(false);
    jFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    jFrame.add(new Fire());
    jFrame.pack();
    jFrame.setLocationRelativeTo(null);
    jFrame.setVisible(true);
  }

}
