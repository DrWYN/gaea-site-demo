import React from 'react';
import renderer from 'react-test-renderer';
import TextInput from '../index';

describe('<TextInput />', () => {

  it('no props', () => {
    const component = renderer.create(<TextInput />);

    let snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('multiline', () => {
    const component = renderer.create(<TextInput multiline={true} numberOfLines={100} editable={true}/>);

    let snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });
})
