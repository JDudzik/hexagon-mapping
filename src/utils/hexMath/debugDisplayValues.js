import { gridToCubic, setToCubic } from './conversions';
import { getCubicByAnchor, getNeighbor, getAllNeighbors, rotateNeighbors } from './interactions';
import { getGridHexes } from './grid';

export const showCubicWithNewOrigin = (gridData, updateHexes, anchorGridCoords) => {
  const newHexes = getGridHexes(gridData, (gridCoords, hexData) => {
    const anchoredCubicCoords = getCubicByAnchor(anchorGridCoords, gridCoords, false);
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

export const rotateAllNeighbors = (anchorCoords, getHex, updateHexes, clockwise = true) => {
  const rotatedGridCoords = rotateNeighbors(anchorCoords, clockwise, 'T', 6);
  // console.log(rotatedGridCoords);
  const rotatedHexData = rotatedGridCoords.map(coords => ({
    gridCoords: coords.initialCoords,
    hexData: getHex(coords.rotatedCoords).hexData,
  }));
  updateHexes(rotatedHexData.filter(hex => !!hex.hexData));
};
