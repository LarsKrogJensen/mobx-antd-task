
import {TaskStore} from "./TaskStore";
import {observer} from "mobx-react";
import * as React from "react";
import {Checkbox} from "antd"
import {DataGridHeaderCell, DataGridHeaderRow} from "../components/DataGrid";


interface  TaskHeaderRowProps {
    store: TaskStore
}

@observer
export default class TaskHeaderRow extends React.Component<TaskHeaderRowProps, undefined> {


    constructor(props: TaskHeaderRowProps, context: any) {
        super(props, context);
        this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    handleCheckChange() {
        const store = this.props.store;
        const done = store.completedCount;
        const total = store.tasks.length;

        store.tasks.forEach(model => model.setDone(done < total))
    }

    renderCheckbox(): JSX.Element {
        const store = this.props.store;
        const done = store.completedCount;
        const total = store.tasks.length;

        return <Checkbox indeterminate={done != total && done > 0} checked={done == total}
                         onChange={this.handleCheckChange}>Done</Checkbox>
    }

    render() {
        return (
            <DataGridHeaderRow>
                <DataGridHeaderCell>{this.renderCheckbox()}</DataGridHeaderCell>
                <DataGridHeaderCell>Text</DataGridHeaderCell>
                <DataGridHeaderCell>Actions</DataGridHeaderCell>
            </DataGridHeaderRow>);
    }
}

