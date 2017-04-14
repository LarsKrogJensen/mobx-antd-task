import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {App} from './App';
import {STORE_TASK} from '../constants/stores';
import {TaskStore} from "../task/TaskStore";
import "./theme.less";
import {TaskApp} from "../task/TaskApp";

// enable MobX strict mode
useStrict(true);

const taskStore = new TaskStore();
const rootStores = {
    [STORE_TASK]: taskStore
};

// render react DOM
ReactDOM.render(
    <Provider {...rootStores}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={TaskApp}/>
            </Route>
        </Router>
    </Provider >,
    document.getElementById('root')
);