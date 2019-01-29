import { gridToCubic, setToCubic } from './conversions';
import { getCubicFromAnchor, getNeighbor, getAllNeighbors, rotateNeighbors } from './interactions';
import { getGridHexes } from './grid';

export const showCubicWithNewOrigin = (gridData, updateHexes, anchorGridCoords) => {
  const newHexes = getGridHexes(gridData, (gridCoords, hexData) => {
    const anchoredCubicCoords = getCubicFromAnchor(anchorGridCoords, gridCoords, false);
    hexData.topper = `${anchoredCubicCoords.x}, ${anchoredCubicCoords.y}, ${anchoredCubicCoords.z}`;
    return hexData;
  });
  updateHexes(newHexes);
};

export const setNeighborsToBrown = (getHex, updateHexes, gridCoords) => {
  const allNeighbors = getAllNeighbors(gridCoords)
    .map(neighborCoords => {
      const neighborHex = getHex(neighborCoords);
      if (!!neighborHex) { neighborHex.hexData.color = 'brown'; }
      return neighborHex;
    });
  updateHexes([...allNeighbors]);
};

export const rotateAllNeighbors = (anchorCoords) => {
  const anchorCubicCoords = setToCubic(anchorCoords);
  console.log( rotateNeighbors(anchorCoords) );

};
