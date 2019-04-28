import * as React from 'react';

interface ITextInputProps {
  testID?: string;
  className?: string;
  style?: any;
  value?: string;
  autoCapitalize?: string;
  autoFocus?: boolean;
  blurOnSubmit?: boolean;
  defaultValue?: string;
  editable?: boolean;
  type?: string;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  onBlur?: any;
  onChange?: any;
  onFocus?: any;
  onKeyDown?: any;
  onKeyPress?: any;
  onSelectionChange?: any;
  placeholder?: string;
  secureTextEntry?: boolean;
}

class TextInput extends React.Component<ITextInputProps, any> {
  static displayName = 'TextInput'; 

  render() {
    const {
      multiline,
      testID,
      numberOfLines=2,
      editable=true,
      ...other 
    } = this.props;

    if(multiline){
      return <textarea 
        dir={"auto"}
        rows={numberOfLines}
        readOnly={!editable}
        {...other}/>
    } else {
      return <input 
        dir={"auto"}
        readOnly={!editable}
        {...other}/>
    }
  }
}
export default TextInput;
