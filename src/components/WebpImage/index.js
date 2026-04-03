import React from 'react';
import detectWebpSupport from '../../utils/detectWebpSupport';
import styled from 'styled-components';

const BackgroundImage = styled.div`
  background-image: url(${p => p.src});
`;

export default class WebpImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSource: undefined,
    };
  }

  async setSupported() {
    if (await detectWebpSupport()) {
      this.setImageSrc(true);
    }
    else {
      this.setImageSrc(false);
    }
  }

  async setImageSrc(supportsWebp) {
    const { src, fallback } = this.props;
    const imagePath = supportsWebp ? src : fallback;

    // eslint-disable-next-line no-restricted-globals
    const imageSource = await import(`../../assets/images/${imagePath}`);

    this.setState({imageSource: imageSource.default});
  }

  render() {
    const { imageSource } = this.state;
    const { src, fallback, alt, renderAsImg, ...remainingProps} = this.props;
    if (imageSource === undefined) {
      this.setSupported();
      return null;
    }

    if (renderAsImg) {
      return <img alt={alt || null} src={imageSource} {...remainingProps} />;
    }

    return <BackgroundImage src={imageSource} {...remainingProps} />;
  }
}

