import React, { Component } from 'react';
import styled from 'styled-components';
import Board from '../../components/Board';

const LandingWrapper = styled.div`
  ${'' /* display: flex;

  @media screen and (max-width: ${p => p.theme.phone}) {
    flex-direction: column;
  } */}
`;


class Landing extends Component {
  render() {
    return (
      <LandingWrapper>
        Welcome!
        <Board />
      </LandingWrapper>
    );
  }
}

export default Landing;
