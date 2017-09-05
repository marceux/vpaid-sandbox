import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './EventLog.css';

class EventLog extends PureComponent {
  render() {
    const { log } = this.props;

    return (
      <div className="event-logger__log">
        <span>{log.test}</span>
      </div>
    );
  }
}

EventLog.propTypes = {
  log: PropTypes.object.isRequired,
};

export default EventLog;
