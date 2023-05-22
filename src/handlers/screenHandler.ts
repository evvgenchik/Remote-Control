import Jimp from 'jimp';
import { Image, Region, screen } from '@nut-tree/nut-js';
import { WebSocket } from 'ws';
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

const imageConverter = async (icon: Image) => {
  const iconObj = await icon.toRGB();

  const iconJimp = new Jimp(iconObj, (err: Error) => {
    if (err) console.log('Error with icon JIMP');
  });

  const iconBuffer = await iconJimp.getBufferAsync(Jimp.MIME_PNG);
  const iconBase64 = iconBuffer.toString('base64');

  return iconBase64;
};

const screenHandler = async (ws: WebSocket) => {
  try {
    const regionToCapture = await getScreenshotRefion();
    const iconObjBgr = await screen.grabRegion(regionToCapture);
    const icon = await imageConverter(iconObjBgr);

    ws.send(`prnt_scrn ${icon}`);
  } catch (err: unknown) {
    console.log(err);
  }
};

export default screenHandler;
