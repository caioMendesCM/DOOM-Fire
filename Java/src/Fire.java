import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.Random;

class ColorPalette {
  private static final Color[] intensityColors = {
      new Color(7, 7, 7),
      new Color(31, 7, 7),
      new Color(47, 15, 7),
      new Color(71, 15, 7),
      new Color(87, 23, 7),
      new Color(103, 31, 7),
      new Color(119, 31, 7),
      new Color(143, 39, 7),
      new Color(159, 47, 7),
      new Color(175, 63, 7),
      new Color(191, 71, 7),
      new Color(199, 71, 7),
      new Color(223, 79, 7),
      new Color(223, 87, 7),
      new Color(223, 87, 7),
      new Color(215, 95, 7),
      new Color(215, 95, 7),
      new Color(215, 103, 15),
      new Color(207, 111, 15),
      new Color(207, 119, 15),
      new Color(207, 127, 15),
      new Color(207, 135, 23),
      new Color(199, 135, 23),
      new Color(199, 143, 23),
      new Color(199, 151, 31),
      new Color(191, 159, 31),
      new Color(191, 159, 31),
      new Color(191, 167, 39),
      new Color(191, 167, 39),
      new Color(191, 175, 47),
      new Color(183, 175, 47),
      new Color(183, 183, 47),
      new Color(183, 183, 55),
      new Color(207, 207, 111),
      new Color(223, 223, 159),
      new Color(239, 239, 199),
      new Color(255, 255, 255),
  };

  public static Color colorByIntensity(int intensity) {
    if (intensity >= 0 || intensity <= 36) {
      return intensityColors[intensity];
    }
    return Color.BLACK;
  }

}

public class Fire extends JPanel implements Runnable {
  boolean isRunning;
  Thread thread;
  BufferedImage view;

  private final int SIZE = 320;

  private int firePixelMatrix[][];
  private int pixelSize = 8;
  private final int fireWidth = 40;
  private final int fireHeight = 40;
  private boolean onOff = true;

  public Fire() {
    setPreferredSize(new Dimension(SIZE, SIZE));
  }

  public boolean isOnOff() {
    return this.onOff;
  }

  public void setOnOff(boolean onOff) {
    this.onOff = onOff;
  }

  public void renderFire() {
    Graphics2D g2 = (Graphics2D) view.getGraphics();

    for (int row = 0; row < fireWidth; row++) {
      for (int column = 0; column < fireHeight; column++) {
        g2.setColor(ColorPalette.colorByIntensity(firePixelMatrix[row][column]));
        g2.fillRect(column * pixelSize, row * pixelSize, pixelSize, pixelSize);
      }
    }

    Graphics g = getGraphics();
    g.drawImage(view, 0, 0, SIZE, SIZE, null);
    g.dispose();
  }

  public void updateFire() {
    for (int row = 0; row < fireWidth; row++) {
      for (int column = 0; column < fireHeight; column++) {
        if (column + 1 < fireHeight) {
          int decay = new Random().nextInt(3);
          int belowIntensity = Math.max(firePixelMatrix[column + 1][row]- decay, 0);
          if (row - decay >= 0) {
            firePixelMatrix[column][row - decay] = belowIntensity;
          } else if (column - 1 >= 0) {
            firePixelMatrix[column][fireHeight - decay] = belowIntensity;
          } else {
            firePixelMatrix[column][row] = belowIntensity;
          }
        }
      }
    }
  }

  @Override
  public void run() {
    try {
      start();
      while (isRunning) {
        updateFire();
        renderFire();
        Thread.sleep(1000 / 30);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  public void addNotify() {
    super.addNotify();
    if (thread == null) {
      thread = new Thread(this);
      isRunning = true;
      thread.start();
    }
  }

  public void start() {
    view = new BufferedImage(SIZE, SIZE, BufferedImage.TYPE_INT_RGB);
    firePixelMatrix = new int[fireWidth][fireHeight];

    for (int row = 0; row < fireWidth; row++) {
      for (int column = 0; column < fireHeight; column++) {
        if (row + 1 < fireWidth) {
          firePixelMatrix[row][column] = 0;
        } else {
          firePixelMatrix[row][column] = 36;
        }
      }
    }

  }

}
