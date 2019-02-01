import { gridToCubic, setToCubic, setToGrid } from '../conversions';
import { getCubicByAnchor, getCoordsFromAnchor, getNeighbor, getAllNeighbors, rotateNeighbors } from '../interactions';
import { interpolatedHexes } from '../lerp';
import { getGridHexes } from '../helpers';

export const showCubicWithNewOrigin = (gridData, updateHexes, anchorGridCoords) => {
  const newHexes = getGridHexes(gridData, (gridCoords, hexData) => {
    const anchoredCubicCoords = getCubicByAnchor(anchorGridCoords, gridCoords);
    const unanchoredGridCoords = getCoordsFromAnchor(anchorGridCoords, anchoredCubicCoords);
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
  const rotatedHexData = rotatedGridCoords.map(coords => ({
    gridCoords: coords.initialCoords,
    hexData: getHex(coords.rotatedCoords).hexData,
  }));
  updateHexes(rotatedHexData.filter(hex => !!hex.hexData));
};


export const visuallyDrawLerpLine = (p0, p1, updateHexes) => {
  const lerpedHexes = interpolatedHexes(p0, p1);

  updateHexes(lerpedHexes.map((coords, index) => ({
    gridCoords: setToGrid(coords),
    hexData: {color: 'tan', topper: index},
  })));
};
