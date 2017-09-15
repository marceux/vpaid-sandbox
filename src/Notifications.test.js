import React from 'react';
import { shallow, mount } from 'enzyme';
import Notifications from './Notifications';

jest.useFakeTimers();

describe('<Notifications />', () => {
  let component;

  beforeAll(() => {
    component = mount(<Notifications hasUpdated={false} />);
  });

  it('remains hidden if hasUpdated is false', () => {
    let notifications = component.find('.notifications');
    expect(notifications.hasClass('notifications--hidden')).toBe(true);
  });

  it('reveals itself if hasUpdated is true', () => {
    component.setProps({ hasUpdated: true });

    let notifications = component.find('.notifications');
    expect(notifications.hasClass('notifications--visible')).toBe(true);
  });
});
