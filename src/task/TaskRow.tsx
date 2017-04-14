import {TaskModel} from "./TaskModel";
import {observer} from "mobx-react";
import {DataGridCell, DataGridRow} from "../components/DataGrid";
import {Checkbox, Input, Button} from "antd";
import * as React from "react";

interface TaskRowProps {
    model: TaskModel
    onRemoveTask: (model: TaskModel) => void
}

@observer
export default class TaskRow extends React.Component<TaskRowProps, {}> {


    constructor(props: TaskRowProps, context: any) {
        super(props, context);
        this.onChangeTask = this.onChangeTask.bind(this);
    }

    render() {
        let model = this.props.model;

        return (
            <DataGridRow>
                <DataGridCell><Checkbox checked={model.done}
                                        onChange={() => model.setDone(!model.done)}/></DataGridCell>
                <DataGridCell><Input placeholder="Enter task" value={model.text}
                                     onChange={this.onChangeTask}/></DataGridCell>
                <DataGridCell><Button size="small"
                                      onClick={() => this.props.onRemoveTask(model)}>remove</Button></DataGridCell>
            </DataGridRow>);
    }

    private onChangeTask(e) {
        this.props.model.setText(e.target.value)
    }
}
