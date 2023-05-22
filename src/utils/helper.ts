import { mouse } from '@nut-tree/nut-js';

const getCoordinate = async () => {
  return mouse.getPosition();
};

export default getCoordinate;
