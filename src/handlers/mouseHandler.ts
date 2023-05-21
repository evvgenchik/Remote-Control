import { WebSocket } from 'ws';
import { getCoordinate } from '../utils/helper.js';

const mouseHandler = async (command: string, ws: WebSocket) => {
  const { x, y } = await getCoordinate();

  ws.send(`mouse_position ${x},${y}`);
};

export default mouseHandler;
