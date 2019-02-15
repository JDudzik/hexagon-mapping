import React, { Component } from 'react';
import GridDataContext from './index';
// import browserStorage from 'store';

// Utils
import { setToGrid } from '../../utils/hexMath/conversions';
import { deepClone } from '../../utils/hexMath/helpers';

class GridDataContextProvider extends Component {
  state = {
    gridData: [],
  }

  // async componentDidMount() {
  //   const storedInBrowser = browserStorage.get('gridDataContext');
  //   if (storedInBrowser) { this.setState(storedInBrowser); }
  // }

  /*****************************/
  /* Make available to context */
  /*****************************/

  updateHexes = (hexValues) => {
    // Example hexValues:
    // [{
    //   gridCoords: {x: 1, y: 2},
    //   hexData: {color: 'red', topper: 'Example'},
    // }]
    const updatedGridData = this.state.gridData;

    deepClone(hexValues).forEach(newHex => {
      const {gridCoords, hexData} = newHex;
      if (this.doesHexExists(gridCoords)) {
        updatedGridData[gridCoords.y][gridCoords.x] = hexData;
      }
    });

    this.setState({
      gridData: updatedGridData,
    });
  }

  setNewBoard = (newGridData) => {
    this.setState({
      gridData: deepClone(newGridData),
    });
  }

  getHex = (coords) => {
    const gridCoords = setToGrid(coords);
    if (!this.doesHexExists(gridCoords)) {
      return false;
    }

    const clonedHexData = deepClone(this.state.gridData[gridCoords.y][gridCoords.x]);
    return {
      gridCoords: {x: gridCoords.x, y: gridCoords.y},
      hexData: clonedHexData,
    };
  }

  doesHexExists = (coords) => {
    if (!coords) { return false; }
    const { gridData } = this.state;
    const { x, y } = setToGrid(coords);
    if (!!gridData[y] && !!gridData[y][x]) { return true; }
    return false;
  }


  /*******************/
  /* Private helpers */
  /*******************/

  // setStateAndStorage = (newState, callback) => {
  //   this.setState(newState, () => {
  //     browserStorage.set('gridDataContext', this.state);
  //     if (callback) { return callback(); }
  //   })
  // }


  /**********/
  /* Render */
  /**********/

  render() {
    let { children } = this.props;
    let { gridData } = this.state;

    return (
      <div>
        <GridDataContext.Provider value={{
          gridData,
          updateHexes: this.updateHexes,
          setNewBoard: this.setNewBoard,
          getHex: this.getHex,
        }}>
          {children}
        </GridDataContext.Provider>
      </div>
    );
  }
}

export default GridDataContextProvider;
