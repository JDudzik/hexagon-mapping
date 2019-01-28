import React, { Component } from 'react';
import withGridDataContext from '../../contexts/GridDataContext/withGridDataContext';
import styled from 'styled-components';
import Hexagon from './Hexagon';
import { swapFullToppersToCubic, swapFullToppersToAxial, setBasicGridToppers, swapFullToppersWithNewOrigin } from '../../utils/hexMath/debugDisplayValues';
import { getGridHexes } from '../../utils/hexMath/grid';


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

// const logHexColor = (x, y) => console.log(`selected: ${gridData[y][x].color}`);
const highlightedEdges = [];

const buildGrid = (gridData, hexSize, handleHexClick) => getGridHexes(gridData).map(hex => (
  <React.Fragment key={`${hex.gridCoords.x}-${hex.gridCoords.y}`}>
    <Hexagon
      fill={hex.hexData.color}
      gridCoords={hex.gridCoords}
      highlightedEdges={highlightedEdges}
      size={hexSize}
      topper={hex.hexData.topper}
      onClick={handleHexClick}
    >
      {hex.hexData.topper}
    </Hexagon>
    {hex.gridSize.xlength === hex.gridCoords.x + 1 && <br />}
  </React.Fragment>
));

const BoardWrapper = styled.div`
  position: relative;
`;


class Board extends Component {
  componentDidMount() {
    this.props.gridDataContext.setNewBoard(gridData);
  }

  hexClicked = (gridCoords) => {
    const { gridData, updateHexes } = this.props.gridDataContext;
    swapFullToppersWithNewOrigin(gridData, updateHexes, gridCoords);
  };

  render() {
    const { gridData, updateHexes } = this.props.gridDataContext;
    const hexSize = 60;

    return (
      <BoardWrapper>
        <button
          style={{position: 'absolute', top: '-20px', left: '-20px'}}
          onClick={() => swapFullToppersToCubic(gridData, updateHexes)}
        >
          Update!
        </button>

        {buildGrid(gridData, hexSize, this.hexClicked)}
      </BoardWrapper>
    );
  }
}

export default withGridDataContext(Board);
