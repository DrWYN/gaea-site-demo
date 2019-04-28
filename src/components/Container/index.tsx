import React from 'react';
import View from '../View/index';

import styles from './style.module.scss';

interface IProps {
  testID?: string;
  children?: React.ReactNode;
  style?: object;
  className?: string; 
}

class Container extends React.Component<IProps, any> {
  constructor(props: IProps){
    super(props);
  }

  render(){
    const {children, ...other} = this.props;
    return (
      <View
        className={`flex flex-1 flex-column ${styles.container}`}
        {...other}>
      { children }
      </View>
    )
  }
}

export default Container;
