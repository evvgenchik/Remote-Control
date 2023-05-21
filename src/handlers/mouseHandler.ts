import { down, left, mouse, right, up } from '@nut-tree/nut-js';
import { WebSocket } from 'ws';
import { getCoordinate } from '../utils/helper.js';

type MouseMover = {
  mouse_up(y: number): Promise<void>;
  mouse_down(y: number): Promise<void>;
  mouse_left(x: number): Promise<void>;
  mouse_right(x: number): Promise<void>;
};

const mouseMover = {
  async mouse_up(y: number) {
    await mouse.move(up(y));
  },
  async mouse_down(y: number) {
    await mouse.move(down(y));
  },
  async mouse_left(x: number) {
    await mouse.move(left(x));
  },
  async mouse_right(x: number) {
    await mouse.move(right(x));
  },
};

const mousePosition = async (command: string, ws: WebSocket) => {
  const { x, y } = await getCoordinate();
  ws.send(`mouse_position ${x},${y}`);
};

const mouseHandler = async (command: string, distance: string, ws: WebSocket) => {
  const moveCommand = command as keyof MouseMover;
  mouseMover[moveCommand](+distance);
};

export { mouseHandler, mousePosition };
