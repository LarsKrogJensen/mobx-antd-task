import {Layout} from "antd"
import * as React from 'react'
import SearchPage from "../search/SearchPage"
import {
    Link,
    Route,
} from "react-router-dom"

import NewsView from "../graphql/NewsView"
import TaskPage from "../task/TaskPage"
import {Redirect} from "react-router"
import AppHeader from "./AppHeader"

const logo = require("../assets/logo.svg")
const {Content} = Layout

interface IAppProps {
    //
}

export class App extends React.Component<IAppProps, any> {
    
    public render() {
        return (
            <div className="app">
                <Layout className="layout">
                    <AppHeader/>
                    <Layout>
                        <Content className="body">
                            <Route exact path="/" render={() => (
                                <Redirect to="/task"/>
                            )}/>
                            <Route path="/task" component={TaskPage}/>
                            <Route path="/console" component={NewsView}/>
                            <Route path="/search" component={SearchPage}/>
                        </Content>
                    </Layout>
                </Layout>
                {this.renderDevTool()}
            </div>
        )
    }

    private renderDevTool() {
        if (process.env.NODE_ENV !== 'production') {
            const DevTools = require('mobx-react-devtools').default
            return (<DevTools />)
        }
    };
}
