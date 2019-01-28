import { gridToCubic, gridToAxial, axialToGrid } from './conversions';
import { getCubicFromCubicAnchor } from './interactions';
import { getGridHexes } from './grid';

export const swapFullToppersToCubic = (gridData, updateHexes) => {
  const newHexes = [];

  gridData.forEach((yArray, yIndex) => {
    yArray.forEach((hexData, xIndex) => {
      const cubicCoords = gridToCubic({x: xIndex, y: yIndex});
      hexData.topper = `${cubicCoords.x - 4}, ${cubicCoords.y}, ${cubicCoords.z +4}`;
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
