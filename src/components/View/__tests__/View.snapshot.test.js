import React from 'react';
import renderer from 'react-test-renderer';
import View from '../index';

describe('<View />', () => {
  it('no props', () => {
    const component = renderer.create(<View />);
    
    let snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('props testID', () => {
    const component = renderer.create(<View testID="test"/>);

    let snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });
})
