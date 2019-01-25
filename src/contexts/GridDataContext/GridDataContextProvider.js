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
    // const example = [{
    //   x: '2',
    //   y: '3',
    //   hexData: {
    //     color: 'brown',
    //     topper: 'yoop',
    //   },
    // }];
    const gridData = this.state.gridData;
    hexValues.forEach(newHex => {
      const {x, y, hexData} = newHex;
      gridData[y][x] = hexData;
    });

    this.setState({
      gridData,
    });
  }

  setNewBoard = (gridData) => {
    this.setState({
      gridData,
    });
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
        }}>
          {children}
        </GridDataContext.Provider>
      </div>
    );
  }
}

export default GridDataContextProvider;
