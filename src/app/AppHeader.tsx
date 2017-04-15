import * as React from 'react';
import {Layout, Menu} from "antd";
import {SelectParam} from "antd/lib/menu";
import {hashHistory} from "react-router";

const Header = Layout;

interface AppHeaderProps {

}

export default class AppHeader extends React.Component<AppHeaderProps, {}> {

    onMenuSelected(e: SelectParam) {
        hashHistory.push(e.key)
    }


    render() {
        return (
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
        );
    }
}