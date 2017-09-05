import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Notifications.css';

class Notifications extends PureComponent {
  constructor(props) {
    super(props);

    // Component Default State
    this.state = {
      hidden: true,
    };

    // Properties
    this.notificationNode = null;

    // Bind Methods
    this._setNotificationNode = this._setNotificationNode.bind(this);
    this._setNotificationTextNode = this._setNotificationTextNode.bind(this);
  }

  componentWillReceiveProps(newProps) {
    // If the settings changed...
    if (newProps.settings !== this.props.settings) {
      // We need to clear the timeout
      clearTimeout(this.hideTimeout);

      // ...and update the state
      this.setState(prevState => ({ hidden: false }));
    }
  }

  componentDidUpdate(prevProps) {
    // If the settings changed...
    if (prevProps.settings !== this.props.settings) {
      // If we are currently NOT hidden...
      if (!this.state.hidden) {
        // Set a timeout for hidding the state again
        this.hideTimeout = setTimeout(() => {
          this.setState(prevState => ({ hidden: true }));
        }, 3000);
      }
    }
  }

  _setNotificationNode(node) {
    this.notificationNode = node;
  }

  _setNotificationTextNode(node) {
    this.notificationTextNode = node;
  }

  render() {
    let className = 'notifications';
    let style;

    if (this.state.hidden) {
      className += ' notifications--hidden';
    } else {
      if (this.notificationNode) {
        style = {
          maxHeight: `${this.notificationTextNode.offsetHeight}px`,
        };
      }
    }

    return (
      <div className="notifications__container">
        <div className={className} style={style} ref={this._setNotificationNode}>
          <p ref={this._setNotificationTextNode}>Video player configuration updated.</p>
        </div>
      </div>
    );
  }
}

Notifications.propTypes = {
  settings: PropTypes.object.isRequired,
};

export default Notifications;
