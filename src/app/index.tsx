import {useStrict} from 'mobx'
import {Provider} from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import DataApi from "../api/DataApi"
import {PAGE_TASK} from "../constants/pageModels"
import {STORE_NEWS, STORE_SEARCH, STORE_TASK} from '../constants/stores'
import NewsStore from "../graphql/NewsStore"
import TaskPageModel from "../task/TaskPageModel"
import {TaskStore} from "../task/TaskStore"
import {App} from './App'
import "./theme.less"
import SearchStore from "../search/SearchStore"
import AuthApi from "../api/AuthApi"
import {AppContainer} from 'react-hot-loader'

// enable MobX strict mode
useStrict(true)

const authApi: AuthApi = new AuthApi()
const dataApi: DataApi = new DataApi(authApi)

const rootStores = {
    [STORE_TASK]: new TaskStore(),
    [STORE_NEWS]: new NewsStore(dataApi),
    [STORE_SEARCH]: new SearchStore(dataApi)
}

const pageModels = {
    [PAGE_TASK]: new TaskPageModel(),
}

function renderApp() {
    ReactDOM.render(
        <AppContainer>
            <Provider {...rootStores} {...pageModels}>
                <Router>
                    <App/>
                </Router>
            </Provider >
        </AppContainer>,
        document.getElementById('root'),
    )
}
// const module = require('webpack-env')

if (module.hot) {
    module.hot.accept()
    renderApp()
} else {
    renderApp()
}
