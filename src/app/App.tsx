import {Layout, Menu} from "antd"
import {SelectParam} from "antd/lib/menu"
import * as React from 'react'
// import * as PropTypes from 'pr'
import SearchPage from "../search/SearchPage"
import {
    Link,
    Route,
    // RouterChildContext,
    // RouteComponentProps
} from "react-router-dom"

import NewsView from "../graphql/NewsView"
import TaskPage from "../task/TaskPage"

const logo = require("../assets/logo.svg")

const {Header, Content, Footer} = Layout

export class App extends React.Component<any, any> {
    public static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    public render() {
        return (
            <div className="app">
                <Layout className="layout">
                    <Header className="header">
                        <img className="logo" src={logo}/>
                        <Menu
                            onSelect={this.onMenuSelected}
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{lineHeight: '64px'}}>
                            <Menu.Item key="task"><Link to="/task">Todo</Link></Menu.Item>
                            <Menu.Item key="console"><Link to="/console">Console</Link></Menu.Item>
                            <Menu.Item key="search"><Link to="/search">Search</Link></Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Content className="body">
                            <Route exact path="/" component={TaskPage}/>
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

    private onMenuSelected(e: SelectParam) {
        const {
            history,
            route: {
                location,
                match
            }
        } = this.context.router
        history.push(e.key)
    }
}
