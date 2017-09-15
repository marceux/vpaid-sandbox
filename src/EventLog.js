import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './EventLog.css';

class EventLog extends PureComponent {
  constructor(props) {
    super(props);

    // Bind Methods
    this.renderCategory = this.renderCategory.bind(this);
    this.renderCallback = this.renderCallback.bind(this);
    this.renderArgs = this.renderArgs.bind(this);
  }

  renderCategory() {
    const { log } = this.props;    

    if (log.category) {
      return (<span>{log.category}</span>);
    }

    return null;
  }

  renderCallback() {
    const { log } = this.props;

    if (log.callback) {
      return (<span>{log.callback}</span>);
    }

    return null;
  }

  renderArgs() {
    const { log } = this.props;

    if (Array.isArray(log.args)) {
      return (<span>{log.args.join(', ')}</span>);
    }

    return null;
  }

  render() {
    const { log } = this.props;

    let className = "event-log";

    switch (log.type) {
      case 'SUBSCRIBE':
        className += ' event-log--subscribe';
        break;

      case 'UNSUBSCRIBE':
        className += ' event-log--unsubscribe';
        break;

      case 'DISPATCH':
      default:
        className += ' event-log--dispatch';
        break;
    }

    return (
      <div className={className}>
        <div className="event-log__column event-log__category">
          {this.renderCategory()}
        </div>
        <div className="event-log__column event-log__event-name">
          <span>{log.event}</span>
        </div>
        <div className="event-log__column event-log__callback">
          {this.renderCallback()}
        </div>
        <div className="event-log__column event-log__args">
          {this.renderArgs()}
        </div>
      </div>
    );
  }
}

EventLog.propTypes = {
  log: PropTypes.object.isRequired,
};

export default EventLog;
