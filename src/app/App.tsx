import * as React from 'react';
import {Layout, Menu} from "antd";
import {SelectParam} from "antd/lib/menu";
import {hashHistory} from "react-router";

const Header = Layout;
const Content = Layout;

export class App extends React.Component<any, any> {

    renderDevTool() {
        if (process.env.NODE_ENV !== 'production') {
            const DevTools = require('mobx-react-devtools').default;
            return (<DevTools />);
        }
    };

    onMenuSelected(e: SelectParam) {
        hashHistory.push(e.key)
    }

    render() {
        return (
            <Layout>
                <Header style={{position: 'fixed', width: '100%'}}>
                    <div className="logo"/>
                    <Menu
                        onSelect={this.onMenuSelected}
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{lineHeight: '64px'}}>
                        <Menu.Item key="task">Todo</Menu.Item>
                        <Menu.Item key="news">Nacker News</Menu.Item>
                        <Menu.Item key="next">Next</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px', marginTop: 64}}>
                    {this.props.children}
                </Content>
                {this.renderDevTool()}
            </Layout>
        );
    }
}
;
