export const getGridHexes = (gridData, modifyHexCallback) => {
  const hexes = [];
  gridData.forEach((xArray, yIndex) => {
    xArray.forEach((hexData, xIndex) => {
      let newHex = hexData;
      if (modifyHexCallback) {
        newHex = modifyHexCallback({x: xIndex, y: yIndex}, hexData);
      }

      hexes.push({
        gridSize: {yLength: gridData.length, xLength: xArray.length},
        gridCoords: {x: xIndex, y: yIndex},
        hexData: newHex,
      });
    });
  });
  return hexes;
};
