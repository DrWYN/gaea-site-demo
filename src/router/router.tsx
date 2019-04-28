import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import history from 'Lib/history';

const MyLoadingComponent = (props: any): any => {
    // if (props.error) {
        // return <div>Error!: {props.error.message}</div>;
    // } else if (props.timedOut) {
        // return <div>Taking a long time...</div>;
    // } else if (props.pastDelay) {
        // return <div>Loading...</div>;
    // } else {
        return null;
    // }
};

// 报错页面
const AsyncNoMatchPage = Loadable({
    loader: () => import('../pages/nomatch/' /* webpackChunkName:"nomatch" */),
    loading: MyLoadingComponent,
});


export default class Root extends React.Component {
    render() {
        return (
            <Router history={history}>
              <Switch>
                <Route path="/" exact={true} component={AsyncNoMatchPage} /> 
              </Switch>
            </Router>
        );
    }
}
