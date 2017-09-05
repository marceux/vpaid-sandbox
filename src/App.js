import React, { PureComponent } from 'react';
import './App.css';

import EventLogger from './EventLogger';
import Notifications from './Notifications';
import SettingsForm from './SettingsForm';
import VideoWrapper from './VideoWrapper';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      settings: {},
    };

    // Bind Methods
    this._handleVastChange = this._handleVastChange.bind(this);
  }

  _handleVastChange(settings) {
    this.setState(prevState => Object.assign({}, prevState, { settings }));
  }

  render() {
    const { settings } = this.state;
    const { custom, url } = settings;
    const loadVideoJS = (custom !== undefined || url !== undefined);

    return (
      <div className="app">
        <div className="app__header">
          <h1>Barons VPAID Sandbox</h1>
        </div>
        
        <VideoWrapper loadVideoJS={loadVideoJS} vastURL={url} vastTag={custom} />

        <Notifications settings={settings} />

        <SettingsForm
          disable={Boolean(url || custom)}
          onSaveVast={this._handleVastChange}
        />

        <EventLogger />
      </div>
    );
  }
}

export default App;
