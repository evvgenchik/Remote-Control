import { WebSocket } from 'ws';
import mouseHandler from '../handlers/mouseHandler.js';

const commandController = (command: string, ws: WebSocket) => {
  switch (command) {
    case 'mouse_position':
      mouseHandler(command, ws);
      break;
    default:
      console.log('No such command');
  }
};

export default commandController;
