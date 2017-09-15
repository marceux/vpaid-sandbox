import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DMVAST from 'vast-client';

import './VASTForm.css';

class VASTForm extends PureComponent {
  constructor(props) {
    super(props);

    // Default State
    this.state = {
      error: undefined,
      fetching: undefined,
      invalid: undefined,
      textContent: undefined,
    };

    // Bind Methods
    this.isValidURL = this.isValidURL.bind(this);

    this.setInvalid = this.setInvalid.bind(this);
    this.setValid = this.setValid.bind(this);

    this.validateTag = this.validateTag.bind(this);
    this.fetchTag = this.fetchTag.bind(this);

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);

    this.renderErrorMsg = this.renderErrorMsg.bind(this);
  }

  isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  setInvalid(msg) {
    this.setState(prevState => ({ error: msg, fetching: false, invalid: true }));
  }

  setValid() {
    this.setState(prevState => ({ error: undefined, fetching: false, invalid: undefined }));
  }

  validateTag(xmlString) {
    // Variable container for our XML document
    let xml;

    if (typeof xmlString === 'string') {
      xml = (new window.DOMParser()).parseFromString(xmlString, 'text/xml');

      // Use the DMVAST parser to load the XML document if it exists
      DMVAST.parser.load(xml, (error, tag) => {
        if (error) {
          this.setInvalid('Invalid VAST Tag');
        } else {
          this.props.updateTag(tag);
          this.setValid();
        }
      });
    } else {
      this.setInvalid('Tag must be a string');
    }
  }

  fetchTag(url) {
    // We are now fetching, so update the state appropriately
    this.setState(prevState => ({ fetching: true }));

    // Prepare out headers and fetch options
    const headers = new Headers();

    headers.append('Accept', 'application/xml');

    // Set fetch init options
    const init = {
      method: 'GET',
      headers,
    };

    fetch(url, init)
    .then(response => {
      /** response is NOT XML or NOT okay **/
      if (!response.ok) {
        this.setInvalid(`Invalid URL - ${response.status}`);
      } else if (response.headers.get('Content-Type') !== 'text/xml') {
        this.setInvalid('URL provided is not an XML document');
      } else {
        // Attempt to parse the text in the Response body
        response.text().then(this.validateTag);
      }
    })
    .catch((error) => this.setInvalid(`Invalid URL - ${error.message}`));
  }

  handleTextChange(event) {
    const { value } = event.target;

    this.setState(prevState => ({ error: undefined, textContent: value, invalid: undefined }));
  }

  handleButtonClick() {
    const { textContent } = this.state;

    if (!textContent || textContent === '') {
      this.setInvalid('Missing URL or VAST Tag');
    } else if (this.isValidURL(textContent)) {
      this.fetchTag(textContent);
    } else {
      this.validateTag(textContent);
    }
  }

  renderErrorMsg() {
    const { error, invalid } = this.state;

    // If valid IS set, and it's NOT truthy...
    if (invalid) {
      // Return our error message
      return (
        <p className="vast-form__error-wrapper">
          <span className="vast-form__error">{error}</span>
        </p>
      );
    }

    return;
  }

  render() {
    let className = 'vast-form';

    if (this.state.invalid) {
      className += ' vast-form--invalid';
    }

    return (
      <div className={className}>
        <div className="vast-form__text-wrapper">
          <textarea onChange={this.handleTextChange} rows="5" />
          {this.renderErrorMsg()}
        </div>

        <button
          className="vast-form__button"
          onClick={this.handleButtonClick}
        >
          <span>Update VAST Tag</span>
        </button>
      </div>
    );
  }
}

VASTForm.propTypes = {
  updateTag: PropTypes.func.isRequired,
};

export default VASTForm;
