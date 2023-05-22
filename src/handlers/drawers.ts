import { Button, Point, down, left, mouse, right, up } from '@nut-tree/nut-js';
import getCoordinate from '../utils/helper.js';

const squareDrawer = async (width: number) => {
  await mouse.pressButton(Button.LEFT);
  await mouse.move(down(width));
  await mouse.move(right(width));
  await mouse.move(up(width));
  await mouse.move(left(width));
  await mouse.releaseButton(Button.LEFT);
};

const rectangularDrawer = async (width: number, length: number) => {
  await mouse.pressButton(Button.LEFT);
  await mouse.move(down(length));
  await mouse.move(right(width));
  await mouse.move(up(length));
  await mouse.move(left(width));
  await mouse.releaseButton(Button.LEFT);
};

const circleDrawer = async (radius: number) => {
  const { x, y } = await getCoordinate();
  const arrCoordinates = [];

  for (let i = 0; i < 360; i += 1) {
    const tempY = y + radius * Math.sin((2 * Math.PI * i) / 360);
    const tempX = x - radius + radius * Math.cos((2 * Math.PI * i) / 360);
    arrCoordinates.push(new Point(tempX, tempY));
  }

  await mouse.drag(arrCoordinates);
};

export { squareDrawer, rectangularDrawer, circleDrawer };
