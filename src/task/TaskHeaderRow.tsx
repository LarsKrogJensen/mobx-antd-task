import {Checkbox} from "antd"
import {autobind} from "core-decorators"
import {observer} from "mobx-react"
import * as React from "react"
import {DataGridHeaderCell, DataGridHeaderRow} from "../components/DataGrid"
import {TaskStore} from "./TaskStore"


interface  ITaskHeaderRowProps {
    store: TaskStore
}

@observer
export default class TaskHeaderRow extends React.Component<ITaskHeaderRowProps, undefined> {

    public render() {
        return (
            <DataGridHeaderRow>
                <DataGridHeaderCell>{this.renderCheckbox()}</DataGridHeaderCell>
                <DataGridHeaderCell>Text</DataGridHeaderCell>
                <DataGridHeaderCell>Actions</DataGridHeaderCell>
            </DataGridHeaderRow>)
    }

    @autobind
    private handleCheckChange() {
        const store = this.props.store
        const done = store.completedCount
        const total = store.tasks.length

        store.tasks.forEach(model => model.setCompleted(done < total))
    }

    private renderCheckbox(): JSX.Element {
        const store = this.props.store
        const done = store.completedCount
        const total = store.tasks.length

        return <Checkbox indeterminate={done !== total && done > 0} checked={done === total}
                         onChange={this.handleCheckChange}>Done</Checkbox>
    }

}

