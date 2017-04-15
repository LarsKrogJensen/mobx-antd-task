import {TaskModel} from "./TaskModel";
import {observer} from "mobx-react";
import {DataGridCell, DataGridRow} from "../components/DataGrid";
import {Checkbox, Input, Button} from "antd";
import * as React from "react";
import {autobind} from "core-decorators";

interface TaskRowProps {
    model: TaskModel
    onRemoveTask: (model: TaskModel) => void
}

@observer
export default class TaskRow extends React.Component<TaskRowProps, {}> {

    @autobind
    private onChangeTask(e) {
        this.props.model.setTitle(e.target.value)
    }

    render() {
        let model = this.props.model;

        return (
            <DataGridRow>
                <DataGridCell><Checkbox checked={model.completed}
                                        onChange={() => model.setCompleted(!model.completed)}/></DataGridCell>
                <DataGridCell><Input placeholder="Enter task" value={model.title}
                                     onChange={this.onChangeTask}/></DataGridCell>
                <DataGridCell><Button size="small"
                                      onClick={() => this.props.onRemoveTask(model)}>remove</Button></DataGridCell>
            </DataGridRow>);
    }


}
