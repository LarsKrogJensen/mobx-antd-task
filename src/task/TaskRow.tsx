import {TaskModel} from "./TaskModel";
import {observer} from "mobx-react";
import {DataGridCell, DataGridRow} from "../components/DataGrid";
import {Checkbox, Input, Button} from "antd";
import * as React from "react";
import {autobind} from "core-decorators";
import {TaskStore} from "./TaskStore";

interface TaskRowProps {
    store: TaskStore,
    model: TaskModel
}

@observer
export default class TaskRow extends React.Component<TaskRowProps, {}> {

    @autobind
    private onUpdateTitle(e) {
        const store: TaskStore = this.props.store;
        const model: TaskModel = this.props.model;

        store.dispatch(model, (model) => model.setTitle(e.target.value))
    }

    @autobind
    private onToggleCompleted(e) {
        const store: TaskStore = this.props.store;
        const model: TaskModel = this.props.model;

        store.dispatch(model, (model) => model.setCompleted(e.target.checked))
    }

    @autobind
    private onRemoveTask() {
        const store: TaskStore = this.props.store;
        const model: TaskModel = this.props.model;

        store.remove(model)
    }

    render() {
        let model: TaskModel = this.props.model;

        return (
            <DataGridRow>
                <DataGridCell><Checkbox checked={model.completed}
                                        onChange={this.onToggleCompleted}/></DataGridCell>
                <DataGridCell><Input placeholder="Enter task" value={model.title}
                                     onChange={this.onUpdateTitle}/></DataGridCell>
                <DataGridCell><Button size="small"
                                      onClick={this.onRemoveTask}>remove</Button></DataGridCell>
            </DataGridRow>);
    }


}
