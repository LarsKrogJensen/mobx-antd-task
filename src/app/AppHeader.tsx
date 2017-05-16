import * as React from 'react'
import {RouteComponentProps, withRouter} from "react-router"
import {Layout, Menu} from "antd"
import {Link} from "react-router-dom"

const logo = require("../assets/logo.svg")
const {Header} = Layout

interface IAppHeaderProps extends RouteComponentProps<any> {
    // empty
}

class AppHeader extends React.Component<IAppHeaderProps, {}> {
    public render() {
        const {match, location, history} = this.props
        console.log("Path: " + location.pathname)
        return (
            <Header className="header">
                <Link to="/"><img className="logo" src={logo}/></Link>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    style={{lineHeight: '64px'}}>
                    <Menu.Item key="/task"><Link to="/task">Todo</Link></Menu.Item>
                    <Menu.Item key="/console"><Link to="/console">Console</Link></Menu.Item>
                    <Menu.Item key="/search"><Link to="/search">Search</Link></Menu.Item>
                </Menu>
            </Header>
        )
    }
}

const AppHeaderWithRouter = withRouter(AppHeader)

export default AppHeaderWithRouter
