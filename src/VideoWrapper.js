import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './VideoWrapper.css';

class VideoWrapper extends PureComponent {
  constructor(props) {
    super(props);

    // Properties
    this.playerID = 'sandbox-player';

    // Bind Methods
    this._initializePlayer = this._initializePlayer.bind(this);
    this._isPlayerInitialized = this._isPlayerInitialized.bind(this);
    this._renderVideo = this._renderVideo.bind(this);
    this._shouldRenderVideo = this._shouldRenderVideo.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!this._shouldRenderVideo()) {
      return;
    }

    if (!this._isPlayerInitialized()) {
      this._initializePlayer();
    }
  }

  _shouldRenderVideo() {
    const { loadVideoJS, vastTag, vastURL } = this.props;

    if (!loadVideoJS) {
      return false;
    }

    if (!vastURL && !vastTag) {
      return false;
    } else if (vastURL === '' && vastTag === '') {
      return false;
    }

    return true;
  }

  _isPlayerInitialized() {
    const players = window.videojs.players;

    // If our object has the player ID as a string
    if (this.playerID in players) {
      return true;
    } else {
      return false;
    }
  }

  _initializePlayer() {
    const { vastTag, vastURL } = this.props;

    // Build our imaOptions...
    const imaOptions = {
      id: this.playerID,
    };

    // If we provided a vastTag/vastURL, build the IMA appropriately
    if (vastTag && vastTag !== '') {
      imaOptions.adsResponse = vastTag;
    } else if (vastURL && vastURL !== '') {
      imaOptions.adTagUrl = vastURL;
    } else {
      return;
    }

    // Set the right playerOptions
    const playerOptions = {
      controls: true,
    };

    // Create our player and handle with a callback function onReady
    // eslint-disable-next-line
    const player = window.videojs(this.playerID, playerOptions, () => {
      player.ima(imaOptions);

      // Ad an event on player click (one time)
      player.one('click', () => {
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
        player.play();
      });
    });
  }

  _renderVideo() {
    if (!this._shouldRenderVideo()) {
      return (
        <div className="video__blank">
          <p>Enter Settings Information Above</p>
        </div>
      );
    }
    
    return (
      <video id={this.playerID} className="video-js vjs-default-skin">
        <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
        <source src="http://vjs.zencdn.net/v/oceans.webm" type="video/webm" />
      </video>
    );
  }

  render() {
    return (
      <div className="video-wrapper">
        {this._renderVideo()}
      </div>
    );
  }
}

VideoWrapper.propTypes = {
  loadVideoJS: PropTypes.bool.isRequired,
};

export default VideoWrapper;
