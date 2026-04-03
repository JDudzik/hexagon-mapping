import React, { Component } from 'react';
import styled from 'styled-components';
import Board from '../../components/Board';

const LandingWrapper = styled.div`
  width: 3000px;
  height: 3000px;
  background-color: lightslategrey;
  padding: 30px;
`;


// eslint-disable-next-line react/prefer-stateless-function, react/require-optimization
class Landing extends Component {
  render() {
    return (
      <LandingWrapper>
        <Board />
      </LandingWrapper>
    );
  }
}

export default Landing;
