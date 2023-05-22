import internal from 'stream';
import { mouseHandler, mousePosition } from '../handlers/mouseHandler.js';
import { squareDrawer, rectangularDrawer, circleDrawer } from '../handlers/drawers.js';
import screenHandler from '../handlers/screenHandler.js';

const commandController = (reqCommand: string, stream: internal.Duplex) => {
  const [command, width, length] = [...reqCommand.split(' ')];

  switch (command) {
    case 'mouse_position':
      mousePosition(stream);
      break;
    case 'mouse_up':
      mouseHandler(command, width);
      break;
    case 'mouse_down':
      mouseHandler(command, width);
      break;
    case 'mouse_left':
      mouseHandler(command, width);
      break;
    case 'mouse_right':
      mouseHandler(command, width);
      break;
    case 'draw_square':
      squareDrawer(+width);
      break;
    case 'draw_rectangle':
      rectangularDrawer(+width, +length);
      break;
    case 'draw_circle':
      circleDrawer(+width);
      break;
    case 'prnt_scrn':
      screenHandler(stream);
      break;
    default:
      console.log('No such command');
  }

  console.log(`Server completed commnad: ${command} ${width ?? ''} ${length ?? ''}`);
};

export default commandController;
