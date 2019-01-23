import React from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component,
      });
    }

    render() {
      const {LoadingComponent, ...remainingProps} = this.props;
      const Component = this.state.component;
      const loading = LoadingComponent ? <LoadingComponent /> : null;

      return Component ? <Component {...remainingProps} /> : loading;
    }
  }

  return AsyncComponent;
}
