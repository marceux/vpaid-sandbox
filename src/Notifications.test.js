import React from 'react';
import { shallow, mount } from 'enzyme';
import Notifications from './Notifications';

jest.useFakeTimers();

describe('<Notifications />', () => {
  let component;

  beforeAll(() => {
    const settings = {
      url: '',
      custom: '',
    };

    component = mount(<Notifications settings={settings} />);
  });

  it('reveals itself and then it hides after 3 seconds', () => {
    let notifications = component.find('.notifications');

    expect(notifications.hasClass('notifications--hidden')).toBe(true);

    // Update the props
    component.setProps({ settings: { url: 'Testing' } });

    notifications = component.find('.notifications');

    expect(notifications.hasClass('notifications--revealed')).toBe(true);

    // Force our 3000ms timer to fire
    jest.runTimersToTime(3000);

    expect(component.state('hidden')).toBe(true);
  });
});
