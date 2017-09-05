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

  _handleOptionClick(value) {
    return (event) => {
      const { selected } = this.state;

      if (selected !== value) {
        switch (value) {
          case 0:
          default:
            this.setState(prevState => ({
              selected: 0,
              url: '',
              custom: '',
            }));

            break;
          case 1:
            this.setState(prevState => ({
              selected: 1,
              url: '',
              custom: '',
            }));

            break;
        }
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
    const { disable } = this.props;

    if (disable) {
      return null;
    }

    const { selected } = this.state;

    return (
      <div className="settings__container">
        <div className="settings">
          <ul className="settings__options">
            <li 
              className="settings__option"
              onClick={this._handleOptionClick(0)}
            >
              <input
                checked={(selected === 0)}
                name="vast-option"
                readOnly
                type="radio"
                value="0"
              />
              <label>URL</label>
            </li>
            <li
              className="settings__option"
              onClick={this._handleOptionClick(1)}
            >
              <input
                checked={(selected === 1)}
                name="vast-option"
                readOnly
                type="radio"
                value="1"
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
      </div>
    );
  }
}

SettingsForm.propTypes = {
  disable: PropTypes.bool,
  onSaveVast: PropTypes.func.isRequired,
};

export default SettingsForm;
