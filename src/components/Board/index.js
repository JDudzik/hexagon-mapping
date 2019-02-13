import React, { Component } from 'react';
import withGridDataContext from '../../contexts/GridDataContext/withGridDataContext';
import styled from 'styled-components';
import Hexagon from './Hexagon';
import { showCubicWithNewOrigin, setNeighborsToBrown, rotateAllNeighbors, visuallyDrawLerpLine } from '../../utils/hexMath/debugDisplayValues';
import { setToCubic } from '../../utils/hexMath/conversions';
import { getGridHexes, deepClone } from '../../utils/hexMath/helpers';


const initialGridData = [
  [
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
  ], [
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
  ], [
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
  ], [
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
  ], [
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
  ], [
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
  ], [
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
  ], [
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
  ], [
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
  ], [
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
  ], [
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
    {color: 'grey'},
  ], [
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
    {color: 'darkgrey'},
  ],
];

const highlightedEdges = [];

const buildGrid = (gridData, hexSize, handleHexClick, handleHexHover) => getGridHexes(gridData).map(hex => (
  <React.Fragment key={`${hex.gridCoords.x}-${hex.gridCoords.y}`}>
    <Hexagon
      fill={hex.hexData.color}
      gridCoords={hex.gridCoords}
      highlightedEdges={highlightedEdges}
      size={hexSize}
      topper={hex.hexData.topper}
      onClick={handleHexClick}
      onHover={handleHexHover}
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
  state = {
    selectedCubicCoords: {x:0, y:0, z:0},
    hoveredCubicCoords: undefined,
  }

  _resetBoard = async () => {
    const clonedHexes = deepClone(initialGridData);
    await this.props.gridDataContext.setNewBoard(clonedHexes);
  }

  componentDidMount() {
    this._resetBoard();
  }

  hexClicked = async (gridCoords) => {
    const { gridData, updateHexes, getHex } = this.props.gridDataContext;
    await this._resetBoard();

    this.setState({selectedCubicCoords: setToCubic(gridCoords)}, () => {
      const {selectedCubicCoords} = this.state;

      // rotateAllNeighbors(selectedCubicCoords, getHex, updateHexes);
      setNeighborsToBrown(getHex, updateHexes, selectedCubicCoords);
      // showCubicWithNewOrigin(gridData, updateHexes, selectedCubicCoords);
      // visuallyDrawLerpLine({x: 0, y: 0, z: 0}, selectedCubicCoords, updateHexes);
    });
  };

  hexHovered = async (gridCoords) => {
    const { gridData, updateHexes, getHex } = this.props.gridDataContext;
    await this._resetBoard();

    this.setState({hoveredCubicCoords: setToCubic(gridCoords)}, () => {
      const { selectedCubicCoords, hoveredCubicCoords} = this.state;

      // rotateAllNeighbors(hoveredCubicCoords, getHex, updateHexes);
      // setNeighborsToBrown(getHex, updateHexes, hoveredCubicCoords);
      // showCubicWithNewOrigin(gridData, updateHexes, hoveredCubicCoords);
      visuallyDrawLerpLine(selectedCubicCoords, hoveredCubicCoords, updateHexes);
    });
  }

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

        {buildGrid(gridData, hexSize, this.hexClicked, this.hexHovered)}
      </BoardWrapper>
    );
  }
}

export default withGridDataContext(Board);
