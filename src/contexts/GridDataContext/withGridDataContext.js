import React from 'react';
import GridDataContext from './index';

export default function(WrappedComponent) {
  function withGridDataContext(props) {
    return (
      <GridDataContext.Consumer>
        {
          (context) => (
            <WrappedComponent { ...props } gridDataContext={{ ...context }} />
          )
        }
      </GridDataContext.Consumer>
    );
  }

  withGridDataContext.displayName = `withGridDataContext(${getDisplayName(WrappedComponent)})`;

  return withGridDataContext;
}


function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
