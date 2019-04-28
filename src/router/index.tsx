import * as React from 'react';

import Root from './router';

import styles from './style.module.scss';

class App extends React.Component<any, any>{

  render() {
    return (
      <div className={`flex flex-column ${styles.container}`}>
        <Root />
      </div>
    )
  }
}

export default App;
