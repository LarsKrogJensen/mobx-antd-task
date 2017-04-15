import * as React from 'react';
import {Layout, Menu, Breadcrumb} from "antd";
import AppHeader from "./AppHeader";
import {hashHistory} from "react-router";
import {SelectParam} from "antd/lib/menu";
// import AppHeader from "./AppHeader";

const {Header, Content, Footer} = Layout;

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
            <div className="app">
                <Layout className="layout">
                    <Header className="header">
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
                    <Layout>
                        <Content className="body">
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
                {this.renderDevTool()}
            </div>
        );
    }

    // render() {
    //     return (
    //         <div className="app">
    //             <Layout className="layout">
    //                 <AppHeader/>
    //                 <Content style={{ padding: '0px 50px' }}>
    //                     {this.props.children}
    //                 </Content>
    //             </Layout>
    //
    //         </div>
    //     );
    // }
}
