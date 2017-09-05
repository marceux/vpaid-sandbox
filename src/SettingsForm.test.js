import React from 'react';
import { shallow, mount } from 'enzyme';
import SettingsForm from './SettingsForm';

describe('<SettingsForm />', () => {
  let component;
  let saveVastSpy;

  beforeAll(() => {
    saveVastSpy = jest.fn();
    component = mount(<SettingsForm onSaveVast={saveVastSpy} />);
  });

  it('changes the input box depending on the radio option selected', () => {
    const radioOptions = component.find('.settings__option input');

    // Test to see that we have our radio options
    expect(component.find('.settings__option').length).toBe(2);

    // Check the first option
    radioOptions.at(0).simulate('click');

    // Expect an input text element
    expect(component.find('.settings__input--url').length).toBe(1);

    // Check the second option
    radioOptions.at(1).simulate('click');

    // Expect a textarea element
    expect(component.find('.settings__input--custom').length).toBe(1);
  });

  it('calls an external function when changes are saved with input content', () => {
    // Update the text of the url input...
    const radioOptions = component.find('.settings__option');

    // Select the first option
    radioOptions.at(0).simulate('click');

    // Update the URL input
    component.find('.settings__input--url').simulate('change', {
      target: { name: 'vast-tag--url', value: 'http://www.example.com' },
    });

    // Click our save button
    component.find('.settings__save-btn').simulate('click'); 

    // Select the first option
    radioOptions.at(1).simulate('click');

    // Update the custom input
    component.find('.settings__input--custom').simulate('change', {
      target: { name: 'vast-tag--custom', value: '<vast></vast>' },
    });

    // Click our save button
    component.find('.settings__save-btn').simulate('click'); 

    // Expect our mock to be called...
    expect(saveVastSpy).toBeCalledWith({ url: 'http://www.example.com' });
    expect(saveVastSpy).toBeCalledWith({ custom: '<vast></vast>' });
  });
});
