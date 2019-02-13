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

export const deepClone = data => {
  if (Array.isArray(data)) {
    return data.map(innerData => deepClone(innerData));
  }

  if (data instanceof Object) {
    const newObj = {};
    Object.keys(data).forEach(propKey => newObj[propKey] = deepClone(data[propKey]));
    return newObj;
  }

  return data;
};
