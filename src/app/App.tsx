import {Layout, Menu} from "antd"
import {SelectParam} from "antd/lib/menu"
import * as React from 'react'
import {hashHistory} from "react-router"

const logo = require("../assets/logo.svg")

const {Header, Content, Footer} = Layout

export class App extends React.Component<any, any> {

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
                            <Menu.Item key="task">Todo</Menu.Item>
                            <Menu.Item key="news">Nacker News</Menu.Item>
                            <Menu.Item key="next">Search</Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Content className="body">
                            {this.props.children}
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
        hashHistory.push(e.key)
    }
}
