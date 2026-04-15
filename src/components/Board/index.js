import React, { Component } from 'react';
import withGridDataContext from '../../contexts/GridDataContext/withGridDataContext';
import styled from 'styled-components';
import Hexagon from './Hexagon';
import {
  showCubicWithNewOrigin as displayCubicWithNewOrigin,
  setNeighborsToBrown,
  rotateAllNeighbors,
  visuallyDrawLerpLine,
} from '../../utils/hexMath/debugDisplayValues';
import { setToCubic } from '../../utils/hexMath/conversions';
import { getGridHexes } from '../../utils/hexMath/helpers';


const initialGridData = Array.from(
  { length: 9 },
  (_, rowIndex) => Array.from(
    { length: 9 },
    () => ({ color: rowIndex % 2 === 0 ? 'grey' : 'darkgrey' }),
  ),
);

const highlightedEdges = [];

const CONFIG_PROP_NAMES = [ 'interactionMode' ];

const INTERACTION_MODE_MAP = {
  LinearInterpolation: {
    shouldReset: true,
    interactions: {
      hover: ({ selectedCubicCoords, targetCubicCoords, updateHexes }) => {
        visuallyDrawLerpLine(selectedCubicCoords, targetCubicCoords, updateHexes);
      },
    },
  },
  rotateNeighbors: {
    shouldReset: false,
    interactions: {
      click: ({ targetCubicCoords, getHex, updateHexes }) => {
        rotateAllNeighbors(targetCubicCoords, getHex, updateHexes);
      },
    },
  },
  setNeighborsToBrown: {
    shouldReset: false,
    interactions: {
      click: ({ targetCubicCoords, getHex, updateHexes }) => {
        setNeighborsToBrown(getHex, updateHexes, targetCubicCoords);
      },
    },
  },
  showCubicWithNewOrigin: {
    shouldReset: false,
    interactions: {
      click: ({ gridData, targetCubicCoords, updateHexes }) => {
        displayCubicWithNewOrigin(gridData, updateHexes, targetCubicCoords);
      },
    },
  },
  none: {
    shouldReset: false,
    interactions: {},
  },
};

const buildGrid = (gridData, hexSize, handleHexClick, handleHexHover) => getGridHexes(gridData).map(hex => (
  <Hexagon
    key={ `${ hex.gridCoords.x },${ hex.gridCoords.y }` }
    fill={ hex.hexData.color }
    gridCoords={ hex.gridCoords }
    highlightedEdges={ highlightedEdges }
    size={ hexSize }
    topper={ hex.hexData.topper }
    onClick={ handleHexClick }
    onHover={ handleHexHover }
  >
    {hex.hexData.topper}
  </Hexagon>
));

const BoardWrapper = styled.div`
  position: relative;
  user-select: none;
`;


class Board extends Component {
  state = {
    selectedCubicCoords: { x: 0, y: 0, z: 0 },
    hoveredCubicCoords: undefined,
  };

  static defaultProps = {
    interactionMode: 'LinearInterpolation',
    resetBoardSignal: 0,
  };

  _resetBoard = async () => {
    await this.props.gridDataContext.setNewBoard(initialGridData);
  };

  componentDidMount() {
    this._resetBoard();
  }

  componentDidUpdate(prevProps) {
    const didResetSignalChange = prevProps.resetBoardSignal !== this.props.resetBoardSignal;
    const didAnyConfigChange = CONFIG_PROP_NAMES.some(
      propName => prevProps[propName] !== this.props[propName],
    );

    if (didAnyConfigChange || didResetSignalChange) {
      this._resetBoard();
    }
  }

  shouldComponentUpdate() { return true; } // Explicitly always update the board.

  _runConfiguredInteraction = async ({ interactionType, targetCubicCoords, selectedCubicCoords, hoveredCubicCoords }) => {
    const { interactionMode } = this.props;
    const { gridData, updateHexes, getHex } = this.props.gridDataContext;
    const modeConfig = INTERACTION_MODE_MAP[interactionMode] || INTERACTION_MODE_MAP.none;
    const interactionHandler = modeConfig.interactions[interactionType];

    if (!interactionHandler) {
      return;
    }

    if (modeConfig.shouldReset) {
      await this._resetBoard();
    }

    interactionHandler({
      interactionType,
      targetCubicCoords,
      selectedCubicCoords,
      hoveredCubicCoords,
      gridData,
      updateHexes,
      getHex,
    });
  };

  hexClicked = (gridCoords) => {
    const nextSelected = setToCubic(gridCoords);
    const { hoveredCubicCoords } = this.state;

    this.setState({ selectedCubicCoords: nextSelected }, () => {
      const { selectedCubicCoords } = this.state;

      this._runConfiguredInteraction({
        interactionType: 'click',
        targetCubicCoords: nextSelected,
        selectedCubicCoords,
        hoveredCubicCoords,
      });
    });
  };

  hexHovered = (gridCoords) => {
    const nextHovered = setToCubic(gridCoords);
    const { selectedCubicCoords } = this.state;

    this.setState({ hoveredCubicCoords: nextHovered }, () => {
      const { hoveredCubicCoords } = this.state;

      this._runConfiguredInteraction({
        interactionType: 'hover',
        targetCubicCoords: nextHovered,
        selectedCubicCoords,
        hoveredCubicCoords,
      });
    });
  };

  render() {
    const { gridData } = this.props.gridDataContext;
    const hexSize = 40;

    return (
      <BoardWrapper>
        {buildGrid(gridData, hexSize, this.hexClicked, this.hexHovered)}
      </BoardWrapper>
    );
  }
}

export default withGridDataContext(Board);
