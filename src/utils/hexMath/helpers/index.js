export const getGridHexes = (gridData, modifyHexCallback) => {
  const hexes = [];
  gridData.forEach((xArray, yIndex) => {
    xArray.forEach((hexData, xIndex) => {
      let newHex = hexData;
      if (modifyHexCallback) {
        hexes.push({
          gridSize: {yLength: gridData.length, xLength: xArray.length},
          gridCoords: {x: xIndex, y: yIndex},
          hexData: modifyHexCallback({x: xIndex, y: yIndex}, hexData),
        });
      } else {
        hexes.push({
          gridSize: {yLength: gridData.length, xLength: xArray.length},
          gridCoords: {x: xIndex, y: yIndex},
          hexData: newHex,
        });
      }
    });
  });
  return hexes;
};
