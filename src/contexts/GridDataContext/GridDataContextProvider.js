import React, { Component } from 'react';
import GridDataContext from './index';
// import browserStorage from 'store';


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

    hexValues.forEach(newHex => {
      const {gridCoords, hexData} = newHex;
      if (this.doesHexExists(gridCoords)) {
        updatedGridData[gridCoords.y][gridCoords.x] = hexData;
      }
    });

    this.setState({
      updatedGridData,
    });
  }

  setNewBoard = (updatedGridData) => {
    this.setState({
      gridData: updatedGridData,
    });
  }

  getHex = (gridCoords) => {
    if (!this.doesHexExists(gridCoords)) {
      return false;
    }
    return {
      gridCoords: {x: gridCoords.x, y: gridCoords.y},
      hexData: this.state.gridData[gridCoords.y][gridCoords.x],
    };
  }

  doesHexExists = (gridCoords) => {
    if (!gridCoords) { return false; }
    const { gridData } = this.state;
    const { x, y } = gridCoords;
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
