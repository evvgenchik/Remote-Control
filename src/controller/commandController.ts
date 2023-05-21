import { WebSocket } from 'ws';
import { mouseHandler, mousePosition } from '../handlers/mouseHandler.js';
import { squareDrawer, rectangularDrawer, circleDrawer } from '../handlers/drawers.js';

const commandController = (reqCommand: string, ws: WebSocket) => {
  const [command, width, length] = [...reqCommand.split(' ')];

  switch (command) {
    case 'mouse_position':
      mousePosition(command, ws);
      break;
    case 'mouse_up':
      mouseHandler(command, width, ws);
      break;
    case 'mouse_down':
      mouseHandler(command, width, ws);
      break;
    case 'mouse_left':
      mouseHandler(command, width, ws);
      break;
    case 'mouse_right':
      mouseHandler(command, width, ws);
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

  console.log(`Server completed commnad: ${command} ${width ?? ''} ${length ?? ''}`);
};

export default commandController;
