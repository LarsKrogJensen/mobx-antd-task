import * as React from 'react'
import {match, Route, RouteComponentProps, withRouter} from "react-router"
import {Layout, Menu} from "antd"
import {Link, LinkProps} from "react-router-dom"
import {App} from "./App"

const logo = require("../assets/logo.svg")
const {Header} = Layout

interface IAppHeaderProps extends RouteComponentProps<any> {

}

class AppHeader extends React.Component<IAppHeaderProps, {}> {
    public render() {
        const { match, location, history } = this.props
        console.log("Path: " + location.pathname);
        return (
            <Header className="header">
                <img className="logo" src={logo}/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    style={{lineHeight: '64px'}}>
                    {/*<MenuLink to="/task" label="Todo"/>*/}
                    {/*<MenuLink to="/console" label="Console"/>*/}
                    {/*<MenuLink to="/search" label="Search"/>*/}
                    <Menu.Item key="/task"><Link to="/task">Todo</Link></Menu.Item>
                    <Menu.Item key="/console"><Link to="/console">Console</Link></Menu.Item>
                    <Menu.Item key="/search"><Link to="/search">Search</Link></Menu.Item>
                </Menu>
            </Header>
        )
    }
}

interface IMenuLinkProps extends LinkProps {
    activeOnlyWhenExact?: boolean;
}

const MenuLink: React.SFC<IMenuLinkProps> = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to as string} exact={activeOnlyWhenExact} children={({ match }) => (
    <Menu.Item>
      {match ? '> ' : ''}<Link to={to}>{label}</Link>
    </Menu.Item>
  )}/>
)

const AppHeaderWithRouter = withRouter(AppHeader)

export default AppHeaderWithRouter
