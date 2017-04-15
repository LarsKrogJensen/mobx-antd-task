import * as React from "react";
import {observer} from "mobx-react";
import {TaskStore} from "./TaskStore";
import {Badge, Checkbox} from "antd";
import {DataGridFooter} from "../components/DataGrid";
import TaskViewModel from "./TaskViewModel";
import {autobind} from "core-decorators";


export interface TaskFooterProps {
    store: TaskStore
    viewModel: TaskViewModel
}

@observer
export default class TaskFooter extends React.Component<TaskFooterProps, {}> {
    
    @autobind
    onToggleLoading(e) {
        this.props.store.toggleLoading()
    }

    render() {
        return (
            <DataGridFooter>
                <div className="task-footer">
                    <Badge className="task-footer-item"
                           count={this.props.store.completedCount}
                           style={{backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}}/>
                    <div className="task-footer-item">Completed</div>
                    <Badge className="task-footer-item"
                           count={this.props.store.activeTodoCount}
                           style={{backgroundColor: '#87d068'}}/>
                    <div className="task-footer-item">Remains</div>
                    <div className="filler"/>
                    <Checkbox className="task-toolbar-item"
                              checked={this.props.store.loading}
                              onChange={this.onToggleLoading}>Show Loading</Checkbox>
                </div>
            </DataGridFooter>

        );
    }
}