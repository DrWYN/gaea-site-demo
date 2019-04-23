import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import App from './router/index';
// import store from './store';

import './common/styles/index.scss';
import './fonts/iconfont.css';

ReactDOM.render(
    <App />,
  document.getElementById('root') as HTMLElement
);
// ReactDOM.render(
  // <Provider store={store}>
    // <App />
  // </Provider>,
  // document.getElementById('root') as HTMLElement
// );
registerServiceWorker();
