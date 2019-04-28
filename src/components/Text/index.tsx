import * as React from 'react';

interface ITextProps {
  testID?: string;
  className?: string;
  style?: any;
  numberOfLines?: number;
  children?: any
}

const Text = (props: ITextProps) => {
  const { style = {}, numberOfLines = 0, testID, ...other } = props;
  const lineStyle = numberOfLines > 0 ? {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
    WebkitLineClamp: numberOfLines,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
  } : {wordWrap: 'break-word'}
  
  return (
    <span data-testid={testID} {...other}
      style={{
        ...style,
        ...lineStyle
      }}/>
  ) 
}

export default Text;
