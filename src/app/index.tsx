import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {hashHistory, IndexRedirect, Route, Router} from 'react-router';
import DataApi from "../api/DataApi"
import {PAGE_TASK} from "../constants/pageModels";
import {STORE_NEWS, STORE_SEARCH, STORE_TASK} from '../constants/stores'
import NewsStore from "../hnews/NewsStore";
import NewsView from "../hnews/NewsView";
import SearchPage from "../search/SearchPage"
import TaskPage from "../task/TaskPage";
import TaskPageModel from "../task/TaskPageModel";
import {TaskStore} from "../task/TaskStore";
import {App} from './App';
import "./theme.less";
import SearchStore from "../search/SearchStore"

// enable MobX strict mode
useStrict(true);

const dataApi: DataApi = new DataApi()

const rootStores = {
    [STORE_TASK]: new TaskStore(),
    [STORE_NEWS]: new NewsStore(),
    [STORE_SEARCH]: new SearchStore(dataApi)
};

const pageModels = {
    [PAGE_TASK]: new TaskPageModel(),
}
// render react DOM
ReactDOM.render(
    <Provider {...rootStores} {...pageModels}>
        <Router history={hashHistory}>
            <Route path='/' component={App}>
                <IndexRedirect to="/task"/>
                <Route path="/task" component={TaskPage}/>
                <Route path="/news" component={NewsView}/>
                <Route path="/next" component={SearchPage}/>
            </Route>
        </Router>
    </Provider >,
    document.getElementById('root'),
);
