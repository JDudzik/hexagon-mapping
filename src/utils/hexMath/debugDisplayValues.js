import { gridToCubic, gridToAxial, axialToGrid, cubicToGrid } from './conversions';
import { getCubicFromCubicAnchor, neighborsT } from './interactions';
import { getGridHexes } from './grid';

export const swapFullToppersToCubic = (gridData, updateHexes) => {
  const newHexes = [];
  gridData.forEach((yArray, yIndex) => {
    yArray.forEach((hexData, xIndex) => {
      const cubicCoords = gridToCubic({x: xIndex, y: yIndex});
      hexData.topper = `${cubicCoords.x}, ${cubicCoords.y}, ${cubicCoords.z}`;
      newHexes.push({
        gridCoords: {x: xIndex, y: yIndex},
        hexData: hexData,
      });
    });
  });
  updateHexes(newHexes);
};

export const swapFullToppersWithNewOrigin = (gridData, updateHexes, anchorGridCoords) => {
  const anchorCubicCoords = gridToCubic(anchorGridCoords);
  const newHexes = getGridHexes(gridData, (gridCoords, hexData) => {
    const anchoredCubicCoords = getCubicFromCubicAnchor(anchorCubicCoords, gridCoords);
    hexData.topper = `${anchoredCubicCoords.x}, ${anchoredCubicCoords.y}, ${anchoredCubicCoords.z}`;
    return hexData;
  });
  updateHexes(newHexes);
};

export const setNeighborsToBrown = (getHex, updateHexes, gridCoords) => {
  const topNeighborCoords = neighborsT(gridCoords, true);
  const topNeighbor = getHex(cubicToGrid(topNeighborCoords));
  topNeighbor.hexData.color = 'brown';
  updateHexes([{...topNeighbor}]);
};

// export const swapFullToppersToAxial = (gridData, updateHexes) => {
//   const newHexes = [];
//
//   gridData.forEach((yArray, yIndex) => {
//     yArray.forEach((hexData, xIndex) => {
//       const axialCoords = gridToAxial(xIndex, yIndex);
//       const gridCoords = axialToGrid(axialCoords.x, axialCoords.y);
//       hexData.topper = `
//         [${gridCoords.x},  ${gridCoords.y}] - - - - -
//         [${axialCoords.x}, ${axialCoords.y}]
//       `;
//       newHexes.push({
//         x: xIndex,
//         y: yIndex,
//         hexData: hexData,
//       });
//     });
//   });
//
//   updateHexes(newHexes);
// };


// export const setBasicGridToppers = (gridData, updateHexes) => {
//   const newHexes = [];
//
//   gridData.forEach((yArray, yIndex) => {
//     yArray.forEach((hexData, xIndex) => {
//       hexData.topper = `${xIndex}, ${yIndex}`;
//       newHexes.push({
//         x: xIndex,
//         y: yIndex,
//         hexData: hexData,
//       });
//     });
//   });
//
//   updateHexes(newHexes);
// };
