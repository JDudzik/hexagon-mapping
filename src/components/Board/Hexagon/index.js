import React, { PureComponent } from 'react';
import styled from 'styled-components';
// import verboseShallowCompare from '../../utils/verboseShallowCompare';

const HexagonContainer = styled.div`
  position: absolute;
  left: ${p => p.xPosition}px;
  top: ${p => p.yPosition}px;
  pointer-events: none;
`;

const TopperWrapper = styled.div`
  color: white;
  position: absolute;
  top: 10px;
  left: 25%;
`;

class Hexagon extends PureComponent {
  handleClick = () => {
    const { onClick, gridCoords } = this.props;
    onClick(gridCoords);
  }

  edgeColor = (edgeSide) => {
    const defaultColor = '#000';
    const highlightedColor = '#fff';
    const { highlightedEdges } = this.props;

    if (!highlightedEdges) { return defaultColor; }
    return highlightedEdges.includes(edgeSide) ? highlightedColor : defaultColor;
  }

  render() {
    // console.log('RENDERED HEXAGON');

    const { size, fill, gridCoords, topper } = this.props;
    const isOffsetColumn = gridCoords.x % 2 !== 0;
    const width = size * 2;
    const height = size / 0.57471264367;

    const xPosition = gridCoords.x * width / 1.389995;
    const yPosition = isOffsetColumn
      ? gridCoords.y * height / 1.047275 + height / 2.09455
      : gridCoords.y * height / 1.047275;

    return (
      <HexagonContainer
        xPosition={xPosition}
        yPosition={yPosition}
      >
        <TopperWrapper>
          {topper}
        </TopperWrapper>
        <svg
          height={height}
          version="1.1"
          viewBox="-4.25 0 208.5 173.20508075688772"
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
            <line loc="t  " stroke={this.edgeColor('T')}  strokeWidth="7" x1="151.95" x2="47.99" y1="0" y2="0"/>
            <line loc="t-r" stroke={this.edgeColor('TR')} strokeWidth="7" transform="rotate(60.14806365966797 175.34083557128906,43.948944091796896)" x1="226.67" x2="122.55" y1="43.8" y2="44.1"/>
            <line loc="b-r" stroke={this.edgeColor('BR')} strokeWidth="7" transform="rotate(-60.00247573852539 175.4222564697266,130.13467407226562)" x1="227.4" x2="123.45" y1="129.65" y2="129.65"/>
            <line loc="b  " stroke={this.edgeColor('B')}  strokeWidth="7" x1="152.08" x2="48" y1="173.2" y2="173.2"/>
            <line loc="b-l" stroke={this.edgeColor('BL')} strokeWidth="7" transform="rotate(60 25.35009193420411,129.74034118652344)" x1="77.35" x2="-26.7" y1="130.1" y2="130.1"/>
            <line loc="t-l" stroke={this.edgeColor('TL')} strokeWidth="7" transform="rotate(-60 25.000000000000007,43.500019073486335)" x1="77.19" x2="-26.83" y1="43.4" y2="43.4"/>
          </g>
        </svg>
      </HexagonContainer>
    );
  }
}

export default Hexagon;
