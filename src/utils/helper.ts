import { mouse } from '@nut-tree/nut-js';

const getCoordinate = async () => {
  // console.log(mouse.getPosition());
  return mouse.getPosition();
};

// eslint-disable-next-line import/prefer-default-export
export { getCoordinate };
