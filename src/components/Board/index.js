import React, { Component } from 'react';
import withGridDataContext from '../../contexts/GridDataContext/withGridDataContext';
import styled from 'styled-components';
import Hexagon from './Hexagon';
import { swapFullToppersToCubic, setBasicGridToppers } from '../../utils/hexMath/conversions';


const gridData = [
  [
    {color: 'red', topper: 'H'},
    {color: 'red', topper: 'H'},
    {color: 'red', topper: 'H'},
    {color: 'red', topper: 'H'},
    {color: 'red', topper: 'H'},
    {color: 'red', topper: 'H'},
    {color: 'red', topper: 'H'},
    {color: 'red', topper: 'H'},
    {color: 'red', topper: 'H'},
  ], [
    {color: 'purple', topper: 'H'},
    {color: 'purple', topper: 'H'},
    {color: 'purple', topper: 'H'},
    {color: 'purple', topper: 'H'},
    {color: 'purple', topper: 'H'},
    {color: 'purple', topper: 'H'},
    {color: 'purple', topper: 'H'},
    {color: 'purple', topper: 'H'},
    {color: 'purple', topper: 'H'},
  ], [
    {color: 'blue', topper: 'H'},
    {color: 'blue', topper: 'H'},
    {color: 'blue', topper: 'H'},
    {color: 'blue', topper: 'H'},
    {color: 'blue', topper: 'H'},
    {color: 'blue', topper: 'H'},
    {color: 'blue', topper: 'H'},
    {color: 'blue', topper: 'H'},
    {color: 'blue', topper: 'H'},
  ], [
    {color: 'green', topper: 'H'},
    {color: 'green', topper: 'H'},
    {color: 'green', topper: 'H'},
    {color: 'green', topper: 'H'},
    {color: 'green', topper: 'H'},
    {color: 'green', topper: 'H'},
    {color: 'green', topper: 'H'},
    {color: 'green', topper: 'H'},
    {color: 'green', topper: 'H'},
  ], [
    {color: 'pink', topper: 'H'},
    {color: 'pink', topper: 'H'},
    {color: 'pink', topper: 'H'},
    {color: 'pink', topper: 'H'},
    {color: 'pink', topper: 'H'},
    {color: 'pink', topper: 'H'},
    {color: 'pink', topper: 'H'},
    {color: 'pink', topper: 'H'},
    {color: 'pink', topper: 'H'},
  ], [
    {color: 'lightblue', topper: 'H'},
    {color: 'lightblue', topper: 'H'},
    {color: 'lightblue', topper: 'H'},
    {color: 'lightblue', topper: 'H'},
    {color: 'lightblue', topper: 'H'},
    {color: 'lightblue', topper: 'H'},
    {color: 'lightblue', topper: 'H'},
    {color: 'lightblue', topper: 'H'},
    {color: 'lightblue', topper: 'H'},
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
          onClick={() => swapFullToppersToCubic(gridData, updateHexes)}
        >Update!</button>
        {buildGrid(gridData, size)}
      </BoardWrapper>
    );
  }
}

export default withGridDataContext(Board);
