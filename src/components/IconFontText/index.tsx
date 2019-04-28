import * as React from 'react';

import iconfont from 'Src/fonts/index';

interface ITextProps {
  icon?: string;
  testID?: string;
  className?: string;
  style?: any;
}

const initialStyles = {
    fontFamily: 'iconfont',
}

const IconFontText = (props: ITextProps) => {
  const { icon, style = {}, testID, ...other } = props;
    return (
      <span data-testid={testID} {...other}
          style={{
          ...initialStyles,
          ...style
        }}
        >
      { icon && iconfont[icon] }
      </span>
    )
}

export default IconFontText;

