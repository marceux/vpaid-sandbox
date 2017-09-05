import React, { PureComponent } from 'react';
import './EventLogger.css';

// Modules
import EventLog from './EventLog';

class EventLogger extends PureComponent {
  constructor(props) {
    super(props);

    // Default State
    this.state = {
      logs: [],
    };

    // Bind Methods
    this._setLoggerNode = this._setLoggerNode.bind(this);
    this.renderLogs = this.renderLogs.bind(this);
  }

  _setLoggerNode(node) {
    this.loggerNode = node;
  }

  componentDidMount() {
    // load socket stuff here...
    const socket = window.io('http://localhost:8080');

    socket.on('log', (data) => {
      this.setState(prevState => {
        const logs = [...prevState.logs, data];

        // Now set the update state object
        return { logs };
      });
    });
  }

  componentDidUpdate() {
    if (this.loggerNode) {
      this.loggerNode.scrollTop = this.loggerNode.scrollHeight;
    }
  }

  renderLogs() {
    const { logs } = this.state;

    if (!logs || logs.length < 1) {
      return null;
    }

    if (!Array.isArray(logs)) {
      return null;
    }

    return logs.map((log, index) => (<EventLog key={`log-${index}`} log={log} />));
  }

  render() {
    return (
      <div className="event-logger" ref={this._setLoggerNode}>
        {this.renderLogs()}
      </div>
    );
  }
}

export default EventLogger;
