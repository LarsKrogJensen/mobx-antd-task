import {observer} from "mobx-react"
import * as React from "react"
import {DataGrid, DataGridBody, DataGridHeader} from "../components/DataGrid"
import TaskFooter from "./TaskFooter"
import TaskHeaderRow from "./TaskHeaderRow"
import TaskViewModel from "./TaskPageModel"
import TaskRow from "./TaskRow"
import {TodoFilter} from "./tasks"
import {TaskStore} from "./TaskStore"

interface ITaskListProps {
    store: TaskStore;
    viewModel: TaskViewModel
}

@observer
export default class TaskList extends React.Component<ITaskListProps, {}> {
    public render() {

        const store = this.props.store
        const filter = this.props.viewModel.filter

        return (
            <div className="task-list">
                <DataGrid footer={this.renderFooter()}>
                    <colgroup>
                        <col width={80}/>
                        <col/>
                        <col width={80}/>
                    </colgroup>
                    <DataGridHeader>
                        <TaskHeaderRow store={store}/>
                    </DataGridHeader>
                    <DataGridBody loading={store.loading}>
                        {store.tasks.filter(model => {
                            return (
                                filter === TodoFilter.ALL ||
                                (filter === TodoFilter.COMPLETED && model.completed) ||
                                (filter === TodoFilter.ACTIVE && !model.completed)
                            )
                        }).map(model => <TaskRow key={model.id} store={store} model={model}/>)}
                    </DataGridBody>
                </DataGrid>
            </div>
        )
    }

    private renderFooter() {
        return <TaskFooter viewModel={this.props.viewModel} store={this.props.store}/>
    }
}
