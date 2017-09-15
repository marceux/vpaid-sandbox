import React from 'react';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';

// Component
import VASTForm from './VASTForm';

describe('<VASTForm />', () => {
  let component;
  let updateTag;

  beforeAll(() => {
    updateTag = jest.fn();

    component = mount(<VASTForm updateTag={updateTag} />);
  });

  afterEach(() => {
    // Always reset the state
    component.setState({
      error: undefined,
      fetching: undefined,
      invalid: undefined,
      textContent: undefined,
    });

    // Reset the mock, baby
    fetchMock.restore();
  });

  it('updates the state on textarea change', () => {
    // find the textarea child component
    const textarea = component.find('.vast-form__text-wrapper textarea');

    // simulate change event and change the value
    textarea.simulate('change', { target: { value: 'Testing' }});

    // check the state to make sure that it has the simulated value
    expect(component.state('textContent')).toBe('Testing');
  });

  it('handles missing text content updates', () => {
    // update the textContent value in the state
    component.setState({ textContent: '' });

    // call the update value with a bad XML tag
    component.find('.vast-form__button').simulate('click');

    // expect the state of the component to be invalid
    expect(component.state('invalid')).toBe(true);
  });

  it('handles valid URL updates with invalid responses', () => {
    // manually set fetch call to a valid URL to NOT be an XML document
    fetchMock.get('http://www.test.com', { status: 404 });

    // call the update value with a valid URL
    component.setState({ textContent: 'http://www.test.com' });
    component.find('.vast-form__button').simulate('click');

    // expect the state of the component to EVENTUALLY be invalid
    const promise = fetchMock.flush().then(() => {
      return (component.state('invalid') === true);
    });

    // Expect our promise to eventually resolve and be true
    expect(promise).resolves.toBe(true);
  });

  it('handles valid URL updates', () => {
    // manually set fetch call to a valid URL to NOT be an XML document
    fetchMock.get('http://www.test.com', 200);

    // call the update value with a valid URL
    component.setState({ textContent: 'http://www.test.com' });
    component.find('.vast-form__button').simulate('click');

    // Next, we'll wait till the response is finished, and then
    // get the first response and check to make sure text() was called
    const promise = fetchMock.flush().then((value) => {
      return (value[0].bodyUsed === true);
    });

    expect(promise).resolves.toBe(true);
  });

  it('passes the correct props to its children components', () => {
    // Set the component instance
    const instance = component.instance();

    // verify that Button component receives onClick prop
    const button = component.find('.vast-form__button');
    expect(button.prop('onClick')).toBe(instance.handleButtonClick);

    // verify that textarea component receives onChange prop
    const textarea = component.find('.vast-form__text-wrapper textarea');
    expect(textarea.prop('onChange')).toBe(instance.handleTextChange);

    // verify that we do not see the error field if valid
    expect(component.find('vast-form__error-wrapper').length).toBe(0);

    // set state to invalid and add error
    component.setState({ invalid: true, error: 'Error Text' });

    // Make sure the error wrapper renders appropriately
    const errorWrapper = component.find('.vast-form__error-wrapper');
    expect(errorWrapper.length).toBe(1);
    expect(errorWrapper.text()).toBe('Error Text');
  });
});
