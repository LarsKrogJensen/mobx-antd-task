import * as React from "react";
import {STORE_TASK} from "../constants/stores";
import {TaskStore} from "./TaskStore";
import {Layout, Menu} from "antd";
import {inject, observer} from "mobx-react";
import "./task.less";
import TaskViewModel from "./TaskViewModel";
import TaskView from "./TaskView";

const Header = Layout;
const Content = Layout;


export interface TaskAppProps {
    /** MobX Stores will be injected via @inject() **/
    // [STORE_TASK]: TaskStore;
}

@inject(STORE_TASK)
@observer
export class TaskApp extends React.Component<TaskAppProps, {}> {
    private viewModel = new TaskViewModel();

    constructor(props: TaskAppProps, context: any) {
        super(props, context);
    }

    render() {
        const store: TaskStore = this.props[STORE_TASK];

        return (
            <Layout>
                <Header style={{position: 'fixed', width: '100%'}}>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{lineHeight: '64px'}}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px', marginTop: 64}}>
                    <TaskView viewModel={this.viewModel} store={store}/>
                </Content>
            </Layout>
        );
    }
}

