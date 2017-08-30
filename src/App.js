import React, { PureComponent } from 'react';
import './App.css';

import SettingsForm from './SettingsForm';

class App extends PureComponent {
  constructor(props) {
    super(props);

    // Bind Methods
    this._handleVastChange = this._handleVastChange.bind(this);
  }

  _handleVastChange(options) {
    console.log(options);
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h1>Barons VPAID Sandbox</h1>
        </div>
        <SettingsForm onSaveVast={this._handleVastChange} />
      </div>
    );
  }
}

export default App;
