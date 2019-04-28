import React from 'react';
import renderer from 'react-test-renderer';
import IconFontText from '../index';

describe('<IconFontText />', () => {

  it('props', () => {
    const component = renderer.create(
      <IconFontText
        icon={'test'}
        testID={'test'}
        className={'test'}
        style={{}}
      />
    );

    let snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });
})
