import React, { Component } from 'react';
import withGridDataContext from '../../contexts/GridDataContext/withGridDataContext';
import styled from 'styled-components';
import Hexagon from './Hexagon';
import { showCubicWithNewOrigin, setNeighborsToBrown, rotateAllNeighbors, visuallyDrawLerpLine } from '../../utils/hexMath/debugDisplayValues';
import { getGridHexes, deepClone } from '../../utils/hexMath/helpers';


const initialGridData = [
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
  _resetBoard = async () => {
    const clonedHexes = deepClone(initialGridData);
    // const clonedHexes = initialGridData.map(xArray => xArray.map(hex => ({...hex})));
    await this.props.gridDataContext.setNewBoard(clonedHexes);
  }

  componentDidMount() {
    this._resetBoard();
  }

  hexClicked = async (gridCoords) => {
    const { gridData, updateHexes, getHex } = this.props.gridDataContext;
    await this._resetBoard();

    // rotateAllNeighbors(gridCoords, getHex, updateHexes);
    // setNeighborsToBrown(getHex, updateHexes, gridCoords);
    // showCubicWithNewOrigin(gridData, updateHexes, gridCoords);
    visuallyDrawLerpLine({x: 0, y: 0, z: 0}, gridCoords, updateHexes);
  };

  functionClicked = async () => {
    const { gridData, updateHexes } = this.props.gridDataContext;
    showCubicWithNewOrigin(gridData, updateHexes, {x:2, y:2});
    updateHexes([{
      gridCoords: {x:2, y:2},
      hexData: {color: 'teal', topper: '0, 0, 0'},
    }]);
  }

  render() {
    const { gridData, updateHexes } = this.props.gridDataContext;
    const hexSize = 40;

    return (
      <BoardWrapper>
        <button
          style={{position: 'absolute', top: '-20px', left: '-20px'}}
          onClick={this.functionClicked}
        >
          Function
        </button>

        {buildGrid(gridData, hexSize, this.hexClicked)}
      </BoardWrapper>
    );
  }
}

export default withGridDataContext(Board);
