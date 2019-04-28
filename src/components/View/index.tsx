import React from 'react';

type IProps = React.HTMLAttributes<any> & { 
  testID?: string;
  accessible?: boolean;
 }

class View extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const {children, testID = '', ...other} = this.props;
    return (
      <div
        {...other} 
        data-testid={testID}>
      { children }
      </div>
    );
  }
}

export default View;
