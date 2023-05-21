import { FileType, Region, screen } from '@nut-tree/nut-js';
import { WebSocket } from 'ws';
import fs from 'fs';
import { getCoordinate } from '../utils/helper.js';

const getScreenshotRefion = async () => {
  const screenSize = 200;
  const { x, y } = await getCoordinate();
  const regionToCapture = new Region(
    x - screenSize / 2,
    y - screenSize / 2,
    screenSize,
    screenSize,
  );

  return regionToCapture;
};

const screenHandler = async (ws: WebSocket) => {
  const regionToCapture = await getScreenshotRefion();
  await screen.captureRegion('bord', regionToCapture, FileType.PNG, './');

  const file = await fs.promises.readFile('./bord.png', { encoding: 'base64' });

  ws.send(`prnt_scrn ${file}`);
};

export default screenHandler;
