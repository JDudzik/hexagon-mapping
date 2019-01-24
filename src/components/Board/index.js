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
  ],
];


const buildGrid = (size) => {
  return gridData.map((xArray, yCoord) => {
    return xArray.map((hexData, xCoord) => {
      return (
        <React.Fragment>
          <Hexagon
            fill={hexData.color}
            size={size}
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
  margin: 5%;
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
