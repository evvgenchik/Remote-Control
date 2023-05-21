import { WebSocket } from 'ws';
import {
  Point,
  Region,
  centerOf,
  down,
  left,
  mouse,
  right,
  straightTo,
  up,
} from '@nut-tree/nut-js';
import { getCoordinate } from '../utils/helper.js';

const squareDrawer = async (command: string, width: number, ws: WebSocket) => {
  const { x, y } = await getCoordinate();

  await mouse.move(down(width));
  await mouse.move(right(width));
  await mouse.move(up(width));
  await mouse.move(left(width));
};

const rectangularDrawer = async (command: string, width: number, length: number, ws: WebSocket) => {
  const { x, y } = await getCoordinate();

  await mouse.move(down(length));
  await mouse.move(right(width));
  await mouse.move(up(length));
  await mouse.move(left(width));
};

const circleDrawer = async (command: string, radius: number, ws: WebSocket) => {
  const { x, y } = await getCoordinate();

  const arrCoordinates = [];

  // for (let i = 0; i <= 360; i += 1) {
  //   const tempX = Math.floor(Math.cos((2 * Math.PI * i) / 360)) * radius + x;
  //   const tempY = Math.floor(Math.sin((2 * Math.PI * i) / 360)) * radius + y;

  //   arrCoordinates.push({ tempX, tempY });
  // }

  for (let i = 0; i < 360; i += 1) {
    const tempY = y + radius * Math.sin((2 * Math.PI * i) / 360);
    const tempX = x - radius + radius * Math.cos((2 * Math.PI * i) / 360);
    arrCoordinates.push(new Point(tempX, tempY));
  }

  console.log(arrCoordinates);

  // eslint-disable-next-line no-restricted-syntax
  await mouse.drag(arrCoordinates);

  // await mouse.move(down(width));
  // await mouse.move(right(width));
  // await mouse.move(up(width));
  // await mouse.move(left(width));
};

export { squareDrawer, rectangularDrawer, circleDrawer };
