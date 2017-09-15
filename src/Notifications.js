import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Notifications.css';

class Notifications extends PureComponent {
  render() {
    let className = 'notifications';

    if (this.props.hasUpdated) {
      className += ' notifications--visible';
    } else {
      className += ' notifications--hidden';
    }

    return (
      <div className="notifications__container">
        <div className={className}>
          <p>Successfully updated VAST Tag</p>
        </div>
      </div>
    );
  }
}

Notifications.propTypes = {
  hasUpdated: PropTypes.bool.isRequired,
};

export default Notifications;
