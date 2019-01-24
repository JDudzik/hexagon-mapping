import React, { Component } from 'react';
import styled from 'styled-components';

const HexagonContainer = styled.div`
  position: absolute;
  left: ${p => p.xPosition}px;
  top: ${p => p.yPosition}px;
  pointer-events: none;
`;


class Hexagon extends Component {
  handleClick = () => {
    const { onClick, x, y } = this.props;
    onClick(x, y);
  }

  render() {
    const { size, fill, x, y, border = '#000' } = this.props;
    const isOffsetColumn = y % 2 !== 0;
    const width = size * 2;
    const height = size / 0.57471264367;

    const yPosition = y * (height - 0.5) / 2;
    const xPosition = isOffsetColumn
      ? x * width * 1.5 + width / 1.3352
      : x * width * 1.5;

    return (
      <HexagonContainer
        xPosition={xPosition}
        yPosition={yPosition}
      >
        <svg
          height={height}
          version="1.1"
          viewBox="0 0 200 173.20508075688772"
          width={width}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="null">
            <g id="svg_1" stroke="null">
              <path
                d="m0,86.60254l50,-86.60254l100,0l50,86.60254l-50,86.602541l-100,0l-50,-86.602541z"
                fill={fill}
                stroke="null"
                style={{pointerEvents: 'all'}}
                onClick={this.handleClick}
              />
            </g>
            <line stroke={border} stroke-width="1.5" x1="151" x2="49.666682" y1="0" y2="0"/>
            <line stroke={border} stroke-width="1.5" transform="rotate(60.14806365966797 175.34083557128906,43.948944091796896)" x1="225.608381" x2="125.073283" y1="43.948944" y2="43.948944"/>
            <line stroke={border} stroke-width="1.5" transform="rotate(60 25.35009193420411,129.74034118652344)" x1="75.550259" x2="-24.850086" y1="129.740341" y2="129.740341"/>
            <line stroke={border} stroke-width="1.5" x1="151" x2="49.83334" y1="173" y2="173"/>
            <line stroke={border} stroke-width="1.5" transform="rotate(-60 25.000000000000007,43.500019073486335)" x1="75" x2="-25" y1="43.833339" y2="43.833339"/>
            <line stroke={border} stroke-width="1.5" transform="rotate(-60.00247573852539 175.4222564697266,130.13467407226562)" x1="225.333754" x2="125.510758" y1="130.134664" y2="130.134664"/>
          </g>
        </svg>
      </HexagonContainer>
    );
  }
}

export default Hexagon;
