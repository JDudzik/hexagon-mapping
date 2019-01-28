import { gridToCubic, gridToAxial, axialToGrid } from './conversions';


export const getCubicFromGridAnchor = (anchorGridCoords, gridCoords) => {
  const cubicCoords = gridToCubic(gridCoords);
  const anchorCubicCoords = gridToCubic(anchorGridCoords);

  return {
    x: cubicCoords.x - anchorCubicCoords.x,
    y: cubicCoords.y - anchorCubicCoords.y,
    z: cubicCoords.z - anchorCubicCoords.z,
  };
};

export const getCubicFromCubicAnchor = (anchorCubicCoords, gridCoords) => {
  const cubicCoords = gridToCubic(gridCoords);

  return {
    x: cubicCoords.x - anchorCubicCoords.x,
    y: cubicCoords.y - anchorCubicCoords.y,
    z: cubicCoords.z - anchorCubicCoords.z,
  };
};


// export const swapFullToppersToCubic = (gridData, updateHexes) => {
//   const newHexes = [];
//
//   gridData.forEach((yArray, yIndex) => {
//     yArray.forEach((hexData, xIndex) => {
//       const cubicCoords = gridToCubic(xIndex, yIndex);
//       hexData.topper = `${cubicCoords.x - 4}, ${cubicCoords.y}, ${cubicCoords.z +4}`;
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
