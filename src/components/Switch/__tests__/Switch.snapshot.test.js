import React from 'react';
import renderer from 'react-test-renderer';
import Switch from '../index';

describe('<Switch />', () => {

  it('props msg', () => {
    const component = renderer.create(
      <Switch
        onValueChange={(v)=>{console.log(v)}}
        width={100}
        height={100}
        testID={'test'}
      />
    );

    let snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });
})
