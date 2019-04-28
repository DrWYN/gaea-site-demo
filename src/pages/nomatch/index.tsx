import * as React from 'react';
import Editor from 'Lib/GaeaEditor/index';

import styles from './style.module.scss';

class NoMatch extends React.Component {

  onSave = (v: any) => {
    console.log('--->>>>>>onSave', v)
  }

  render(){
    // const {} = this.props;
    console.log('-->>>>>this.props = ', this.props);
    return (
        <div className={`flex flex-column flex-1 flex-no-shrink flex-center-h ${styles.container}`}>
          <Editor onSave={this.onSave}/>
        </div>
  )
  }
}

export default NoMatch;
