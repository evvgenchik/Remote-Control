import { WebSocket } from 'ws';
import { mouse } from '@nut-tree/nut-js';

const getCoordinate = async () => {
  console.log(mouse.getPosition());
  return mouse.getPosition();
};

const mouseHandler = async (command: string, ws: WebSocket) => {
  const { x, y } = await getCoordinate();

  ws.send(`mouse_position ${x},${y}`);
};

export default mouseHandler;
