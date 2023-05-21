import { WebSocket } from 'ws';
import mouseHandler from '../handlers/mouseHandler.js';
import { squareDrawer, rectangularDrawer, circleDrawer } from '../handlers/drawers.js';

const commandController = (reqCommand: string, ws: WebSocket) => {
  const [command, width, length] = [...reqCommand.split(' ')];

  switch (command) {
    case 'mouse_position':
      mouseHandler(command, ws);
      break;
    case 'draw_square':
      squareDrawer(command, +width, ws);
      break;
    case 'draw_rectangle':
      rectangularDrawer(command, +width, +length, ws);
      break;
    case 'draw_circle':
      circleDrawer(command, +width, ws);
      break;
    default:
      console.log('No such command');
  }
};

export default commandController;
