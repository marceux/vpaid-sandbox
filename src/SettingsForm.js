import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './SettingsForm.css';

class SettingsForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
      url: '',
      custom: '',
    };

    // Bind Methods
    this._handleOptionClick = this._handleOptionClick.bind(this);  
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleSave = this._handleSave.bind(this);  
    this._renderInput = this._renderInput.bind(this);
  }

  _handleOptionClick(event) {
    const { checked, value } = event.target;

    if (checked) {
      switch (value) {
        case 'URL':
        default:
          this.setState(prevState => ({
            selected: 0,
            url: '',
            custom: '',
          }));

          break;
        case 'Custom':
          this.setState(prevState => ({
            selected: 1,
            url: '',
            custom: '',
          }));

          break;
      }
    }
  }

  _handleInputChange(event) {
    const { name, value } = event.target;

    switch (name) {
      case 'vast-tag--url':
      default:
        this.setState(prevState => ({ url: value }));
        break;

      case 'vast-tag--custom':
        this.setState(prevState => ({ custom: value }));
        break;
    }
  }

  _handleSave(event) {
    // State and Props
    const { selected, url, custom } = this.state;
    const { onSaveVast } = this.props;

    if (selected === 0 || !selected) {
      onSaveVast({ url });
    } else {
      onSaveVast({ custom });
    }
  }

  _renderInput() {
    const { selected } = this.state;

    switch (selected) {
      case 0:
      default:
        return (
          <input
            type="text"
            name="vast-tag--url"
            className="settings__input--url"
            onChange={this._handleInputChange}
            placeholder="http://www.example.com/vast.xml"
          />
        );

      case 1:
        return (
          <textarea
            rows="5"
            name="vast-tag--custom"
            className="settings__input--custom"
            onChange={this._handleInputChange}
            placeholder={"<vast>\n\t<Ad>\n\t\t...Content...\n\t</Ad>\n</vast>"}
          />
        );
    }
  }

  render() {
    return (
      <div className="settings">
        <div className="settings__prompt">
          <h2>How will you provide your VAST tag?</h2>
        </div>
        <ul className="settings__options">
          <li className="settings__option">
            <input
              type="radio"
              name="vast-option"
              value="URL"
              defaultChecked
              onClick={this._handleOptionClick}
            />
            <label>URL</label>
          </li>
          <li className="settings__option">
            <input
              type="radio"
              name="vast-option"
              value="Custom"
              onClick={this._handleOptionClick}
            />
            <label>Custom</label>
          </li>
        </ul>
        <div className="settings__input-container">
          {this._renderInput()}
        </div>
        <div className="settings__btn-container">
          <button
            className="settings__save-btn"
            onClick={this._handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  }
}

SettingsForm.propTypes = {
  onSaveVast: PropTypes.func.isRequired,
};

export default SettingsForm;
