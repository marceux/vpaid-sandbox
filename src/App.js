import React, { PureComponent } from 'react';
import './App.css';

import Notifications from './Notifications';
import VASTForm from './VASTForm';

class App extends PureComponent {
  constructor(props) {
    super(props);

    // Default State
    this.state = {
      hasUpdated: false,
    };

    // Default Properties
    this.notifyDelay = 2500;

    // Bind Methods
    this.resetState = this.resetState.bind(this);
    this.updateTag = this.updateTag.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // If our state "hasUpdated" we are going to set a notification timeout
    // At the end of that timeout, we are going to 
    if (!prevState.hasUpdated && this.state.hasUpdated) {
      this.notifyTimeout = setTimeout(this.resetState, this.notifyDelay);
    } else if (!this.state.hasUpdated && this.notifyTimeout) {
      clearTimeout(this.notifyTimeout);
    }
  }

  resetState() {
    if (this.state.hasUpdated) {
      this.setState(prevState => ({ hasUpdated: false }));
    }
  }

  updateTag(tag) {
    this.setState(prevState => ({ vastTag: tag, hasUpdated: true }));
  }

  render() {
    const { hasUpdated } = this.state;

    console.log('hasUpdated Value');
    console.log(hasUpdated);

    return (
      <div className="app">
        <div className="app__header">
          <h1>Barons VPAID Sandbox</h1>
        </div>
        
        <VASTForm updateTag={this.updateTag} />

        <Notifications hasUpdated={hasUpdated} />
      </div>
    );
  }
}

export default App;
