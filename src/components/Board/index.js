import React, { Component } from 'react';
import styled from 'styled-components';
import Hexagon from './Hexagon';


const gridData = [
  [
    {color: 'red', topper: <div>0, 0</div>},
    {color: 'red', topper: <div>1, 0</div>},
    {color: 'red', topper: <div>2, 0</div>},
  ], [
    {color: 'purple', topper: <div>0, 1</div>},
    {color: 'purple', topper: <div>1, 1</div>},
    {color: 'purple', topper: <div>2, 1</div>},
  ], [
    {color: 'blue', topper: <div>0, 2</div>},
    {color: 'blue', topper: <div>1, 2</div>},
    {color: 'blue', topper: <div>2, 2</div>},
  ], [
    {color: 'green', topper: <div>0, 0</div>},
    {color: 'green', topper: <div>1, 0</div>},
    {color: 'green', topper: <div>2, 0</div>},
  ],
];


const buildGrid = (size) => {
  return gridData.map((xArray, yCoord) => {
    return xArray.map((hexData, xCoord) => {
      return (
        <React.Fragment key={`${yCoord}-${xCoord}`}>
          <Hexagon
            fill={hexData.color}
            highlightedEdges={[]}
            size={size}
            topper={hexData.topper}
            x={xCoord}
            y={yCoord}
            onClick={(x, y) => console.log(`selected: ${gridData[y][x].color}`)}
          >
            {hexData.topper}
          </Hexagon>
          {xArray.length === xCoord + 1 && <br />}
        </React.Fragment>
      );
    });
  });
};

const BoardWrapper = styled.div`
  position: relative;
`;


class Board extends Component {
  render() {
    const size = 80;

    return (
      <BoardWrapper>
        {buildGrid(size)}
      </BoardWrapper>
    );
  }
}

export default Board;
