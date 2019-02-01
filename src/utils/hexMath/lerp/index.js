// Linear Interpolation
// L         ERP  = LERP
import { setToCubic } from '../conversions';
import { getDiagonalDistance } from '../interactions';
import { cubicRound } from '../cubicCalculations';

export const lerpPoints = (p0, p1, t) => ({
  x: p0.x + t * (p1.x - p0.x),
  y: p0.y + t * (p1.y - p0.y),
  z: p0.z + t * (p1.z - p0.z),
});

export const interpolatedHexes = (p0, p1) => {
  const diagonalDistance = getDiagonalDistance(p0, setToCubic(p1));
  const hexes = [];

  for (let step = 0; step <= diagonalDistance; step++) {
    const t = diagonalDistance === 0 ? 0.0 : step / diagonalDistance;
    const lerpedPoints = lerpPoints(setToCubic(p0), setToCubic(p1), t);
    hexes.push(cubicRound(lerpedPoints));
  }

  return hexes;
};
