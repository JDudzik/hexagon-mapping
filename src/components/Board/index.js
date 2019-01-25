import React, { Component } from 'react';
import withGridDataContext from '../../contexts/GridDataContext/withGridDataContext';
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
    {color: 'green', topper: <div>0, 3</div>},
    {color: 'green', topper: <div>1, 3</div>},
    {color: 'green', topper: <div>2, 3</div>},
  ],
];

const logHexColor = (x, y) => console.log(`selected: ${gridData[y][x].color}`);
const highlightedEdges = [];

const buildGrid = (gridData, size) => {
  return gridData.map((xArray, yCoord) => {
    return xArray.map((hexData, xCoord) => {
      return (
        <React.Fragment key={`${yCoord}-${xCoord}`}>
          <Hexagon
            fill={hexData.color}
            highlightedEdges={highlightedEdges}
            size={size}
            topper={hexData.topper}
            x={xCoord}
            y={yCoord}
            onClick={logHexColor}
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
  componentDidMount() {
    this.props.gridDataContext.setNewBoard(gridData);
  }

  render() {
    const { gridData, updateHexes } = this.props.gridDataContext;
    const size = 80;

    return (
      <BoardWrapper>
        <button
          style={{position: 'absolute', top: '0'}}
          onClick={() => {
            updateHexes([{x:0, y:1, hexData:{color: 'brown', topper: 'yup!'}}]);
          }}
        >Update!</button>
        {buildGrid(gridData, size)}
      </BoardWrapper>
    );
  }
}

export default withGridDataContext(Board);
