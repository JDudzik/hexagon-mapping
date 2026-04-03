import React, { Component } from 'react';
import styled from 'styled-components';
import Board from '../../components/Board';

const INTERACTION_MODE_OPTIONS = [
  { value: 'LinearInterpolation', label: 'Linear Interpolation' },
  { value: 'showCubicWithNewOrigin', label: 'Show Cubic Coordinates With New Origin' },
  { value: 'rotateNeighbors', label: 'Rotate Neighbors' },
  { value: 'setNeighborsToBrown', label: 'Set Neighbors To Brown' },
  { value: 'none', label: 'None' },
];

const LandingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 30px;
`;

const ControlPanel = styled.div`
  margin-bottom: 16px;
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.15);
`;

const ControlRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
`;

const ResetButton = styled.button`
  width: fit-content;
  user-select: none;
`;

// eslint-disable-next-line react/require-optimization
class Landing extends Component {
  state = {
    interactionMode: 'LinearInterpolation',
    resetBoardSignal: 0,
  };

  handleSelectChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  };

  handleResetBoard = () => {
    this.setState(({ resetBoardSignal }) => ({
      resetBoardSignal: resetBoardSignal + 1,
    }));
  };

  render() {
    const {
      interactionMode,
      resetBoardSignal,
    } = this.state;

    return (
      <LandingWrapper>
        <ControlPanel>
          <ControlRow>
            Interaction Mode:
            <select name="interactionMode" value={ interactionMode } onChange={ this.handleSelectChange }>
              {INTERACTION_MODE_OPTIONS.map(option => (
                <option key={ option.value } value={ option.value }>
                  {option.label}
                </option>
              ))}
            </select>
          </ControlRow>

          <ResetButton type="button" onClick={ this.handleResetBoard }>
            Reset Board
          </ResetButton>
        </ControlPanel>

        <Board
          interactionMode={ interactionMode }
          resetBoardSignal={ resetBoardSignal }
        />
      </LandingWrapper>
    );
  }
}

export default Landing;
