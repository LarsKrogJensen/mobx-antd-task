import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';
import {Router, Route, IndexRedirect, hashHistory} from 'react-router';
import {App} from './App';
import {STORE_NEWS, STORE_TASK} from '../constants/stores';
import {TaskStore} from "../task/TaskStore";
import "./theme.less";
import NewsView from "../hnews/NewsView";
import NewsStore from "../hnews/NewsStore";
import TaskView from "../task/TaskView";
import NextView from "../next/NextView"

// enable MobX strict mode
useStrict(true);

const rootStores = {
    [STORE_TASK]: new TaskStore(),
    [STORE_NEWS]: new NewsStore()
};

// render react DOM
ReactDOM.render(
    <Provider {...rootStores}>
        <Router history={hashHistory}>
            <Route path='/' component={App}>
                <IndexRedirect to="/task"/>
                <Route path="/task" component={TaskView}/>
                <Route path="/news" component={NewsView}/>
                <Route path="/next" component={NextView}/>
            </Route>
        </Router>
    </Provider >,
    document.getElementById('root')
);