import React, { Component } from 'react';
import withGridDataContext from '../../contexts/GridDataContext/withGridDataContext';
import styled from 'styled-components';
import Hexagon from './Hexagon';
import { swapFullToppersToCubic, swapFullToppersToAxial, setBasicGridToppers } from '../../utils/hexMath/conversions';


const gridData = [
  [
    {color: 'red', topper: 'Even'},
    {color: 'red', topper: 'Odd'},
    {color: 'red', topper: 'Even'},
    {color: 'red', topper: 'Odd'},
    {color: 'red', topper: 'Even'},
    {color: 'red', topper: 'Odd'},
    {color: 'red', topper: 'Even'},
    {color: 'red', topper: 'Odd'},
    {color: 'red', topper: 'Even'},
  ], [
    {color: 'purple', topper: 'Even'},
    {color: 'purple', topper: 'Odd'},
    {color: 'purple', topper: 'Even'},
    {color: 'purple', topper: 'Odd'},
    {color: 'purple', topper: 'Even'},
    {color: 'purple', topper: 'Odd'},
    {color: 'purple', topper: 'Even'},
    {color: 'purple', topper: 'Odd'},
    {color: 'purple', topper: 'Even'},
  ], [
    {color: 'blue', topper: 'Even'},
    {color: 'blue', topper: 'Odd'},
    {color: 'blue', topper: 'Even'},
    {color: 'blue', topper: 'Odd'},
    {color: 'blue', topper: 'Even'},
    {color: 'blue', topper: 'Odd'},
    {color: 'blue', topper: 'Even'},
    {color: 'blue', topper: 'Odd'},
    {color: 'blue', topper: 'Even'},
  ], [
    {color: 'green', topper: 'Even'},
    {color: 'green', topper: 'Odd'},
    {color: 'green', topper: 'Even'},
    {color: 'green', topper: 'Odd'},
    {color: 'green', topper: 'Even'},
    {color: 'green', topper: 'Odd'},
    {color: 'green', topper: 'Even'},
    {color: 'green', topper: 'Odd'},
    {color: 'green', topper: 'Even'},
  ], [
    {color: 'pink', topper: 'Even'},
    {color: 'pink', topper: 'Odd'},
    {color: 'pink', topper: 'Even'},
    {color: 'pink', topper: 'Odd'},
    {color: 'pink', topper: 'Even'},
    {color: 'pink', topper: 'Odd'},
    {color: 'pink', topper: 'Even'},
    {color: 'pink', topper: 'Odd'},
    {color: 'pink', topper: 'Even'},
  ], [
    {color: 'lightblue', topper: 'Even'},
    {color: 'lightblue', topper: 'Odd'},
    {color: 'lightblue', topper: 'Even'},
    {color: 'lightblue', topper: 'Odd'},
    {color: 'lightblue', topper: 'Even'},
    {color: 'lightblue', topper: 'Odd'},
    {color: 'lightblue', topper: 'Even'},
    {color: 'lightblue', topper: 'Odd'},
    {color: 'lightblue', topper: 'Even'},
  ], [
    {color: 'red', topper: 'Even'},
    {color: 'red', topper: 'Odd'},
    {color: 'red', topper: 'Even'},
    {color: 'red', topper: 'Odd'},
    {color: 'red', topper: 'Even'},
    {color: 'red', topper: 'Odd'},
    {color: 'red', topper: 'Even'},
    {color: 'red', topper: 'Odd'},
    {color: 'red', topper: 'Even'},
  ], [
    {color: 'purple', topper: 'Even'},
    {color: 'purple', topper: 'Odd'},
    {color: 'purple', topper: 'Even'},
    {color: 'purple', topper: 'Odd'},
    {color: 'purple', topper: 'Even'},
    {color: 'purple', topper: 'Odd'},
    {color: 'purple', topper: 'Even'},
    {color: 'purple', topper: 'Odd'},
    {color: 'purple', topper: 'Even'},
  ], [
    {color: 'blue', topper: 'Even'},
    {color: 'blue', topper: 'Odd'},
    {color: 'blue', topper: 'Even'},
    {color: 'blue', topper: 'Odd'},
    {color: 'blue', topper: 'Even'},
    {color: 'blue', topper: 'Odd'},
    {color: 'blue', topper: 'Even'},
    {color: 'blue', topper: 'Odd'},
    {color: 'blue', topper: 'Even'},
  ], [
    {color: 'green', topper: 'Even'},
    {color: 'green', topper: 'Odd'},
    {color: 'green', topper: 'Even'},
    {color: 'green', topper: 'Odd'},
    {color: 'green', topper: 'Even'},
    {color: 'green', topper: 'Odd'},
    {color: 'green', topper: 'Even'},
    {color: 'green', topper: 'Odd'},
    {color: 'green', topper: 'Even'},
  ], [
    {color: 'pink', topper: 'Even'},
    {color: 'pink', topper: 'Odd'},
    {color: 'pink', topper: 'Even'},
    {color: 'pink', topper: 'Odd'},
    {color: 'pink', topper: 'Even'},
    {color: 'pink', topper: 'Odd'},
    {color: 'pink', topper: 'Even'},
    {color: 'pink', topper: 'Odd'},
    {color: 'pink', topper: 'Even'},
  ], [
    {color: 'lightblue', topper: 'Even'},
    {color: 'lightblue', topper: 'Odd'},
    {color: 'lightblue', topper: 'Even'},
    {color: 'lightblue', topper: 'Odd'},
    {color: 'lightblue', topper: 'Even'},
    {color: 'lightblue', topper: 'Odd'},
    {color: 'lightblue', topper: 'Even'},
    {color: 'lightblue', topper: 'Odd'},
    {color: 'lightblue', topper: 'Even'},
  ],
];

const logHexColor = (x, y) => console.log(`selected: ${gridData[y][x].color}`);
const highlightedEdges = [];

const buildGrid = (gridData, size) => {
  return gridData.map((yArray, yCoord) => {
    return yArray.map((hexData, xCoord) => {
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
          {yArray.length === xCoord + 1 && <br />}
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
    const size = 60;

    return (
      <BoardWrapper>
        <button
          style={{position: 'absolute', top: '-20px', left: '-20px'}}
          onClick={() => swapFullToppersToAxial(gridData, updateHexes)}
        >Update!</button>
        {buildGrid(gridData, size)}
      </BoardWrapper>
    );
  }
}

export default withGridDataContext(Board);
