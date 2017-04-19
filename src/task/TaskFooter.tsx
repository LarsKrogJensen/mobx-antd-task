import {Badge, Checkbox} from "antd"
import {autobind} from "core-decorators"
import {observer} from "mobx-react"
import * as React from "react"
import {DataGridFooter} from "../components/DataGrid"
import TaskViewModel from "./TaskPageModel"
import {TaskStore} from "./TaskStore"


export interface ITaskFooterProps {
    store: TaskStore
    viewModel: TaskViewModel
}

@observer
export default class TaskFooter extends React.Component<ITaskFooterProps, {}> {

    public render() {
        return (
            <DataGridFooter>
                <div className="task-footer">
                    <Badge className="task-footer-item"
                           showZero={true}
                           count={this.props.store.completedCount}
                           style={{backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}}/>
                    <div className="task-footer-item">Completed</div>
                    <Badge className="task-footer-item"
                           count={this.props.store.activeTodoCount}
                           showZero={true}
                           style={{backgroundColor: '#87d068'}}/>
                    <div className="task-footer-item">Remains</div>
                </div>
            </DataGridFooter>

        )
    }
}
