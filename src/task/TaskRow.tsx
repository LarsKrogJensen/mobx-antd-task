import {Button, Checkbox, Input} from "antd"
import {autobind} from "core-decorators"
import {observer} from "mobx-react"
import * as React from "react"
import {DataGridCell, DataGridRow} from "../components/DataGrid"
import {TaskModel} from "./TaskModel"
import {TaskStore} from "./TaskStore"

interface ITaskRowProps {
    store: TaskStore,
    model: TaskModel
}

@observer
export default class TaskRow extends React.Component<ITaskRowProps, {}> {

    public render() {
        const model: TaskModel = this.props.model

        return (
            <DataGridRow>
                <DataGridCell><Checkbox checked={model.completed}
                                        onChange={this.onToggleCompleted}/></DataGridCell>
                <DataGridCell><Input placeholder="Enter task" value={model.title}
                                     onChange={this.onUpdateTitle}/></DataGridCell>
                <DataGridCell><Button size="small"
                                      onClick={this.onRemoveTask}>remove</Button></DataGridCell>
            </DataGridRow>)
    }

    @autobind
    private onUpdateTitle(e) {
        const store: TaskStore = this.props.store
        const model: TaskModel = this.props.model

        store.dispatch(model, taskModel => taskModel.setTitle(e.target.value))
    }

    @autobind
    private onToggleCompleted(e) {
        const store: TaskStore = this.props.store
        const model: TaskModel = this.props.model

        store.dispatch(model, taskModel => taskModel.setCompleted(e.target.checked))
    }

    @autobind
    private onRemoveTask() {
        const store: TaskStore = this.props.store
        const model: TaskModel = this.props.model

        store.remove(model)
    }
}
