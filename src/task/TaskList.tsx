import * as React from "react";
import {TaskStore} from "./TaskStore";
import TaskViewModel from "./TaskViewModel";
import {observer} from "mobx-react";
import {TaskModel} from "./TaskModel";
import {DataGrid, DataGridBody, DataGridHeader} from "../components/DataGrid";
import TaskFooter from "./TaskFooter";
import TaskHeaderRow from "./TaskHeaderRow";
import TaskRow from "./TaskRow";
import {TodoFilter} from "../constants/todos";

interface TaskListProps {
    store: TaskStore;
    viewModel: TaskViewModel
}

@observer
export default class TaskList extends React.Component<TaskListProps, {}> {

    constructor(props: TaskListProps, context: any) {
        super(props, context);
        this.removeTask = this.removeTask.bind(this)
    }

    removeTask(model: TaskModel) {
        this.props.store.remove(model);
    }

    render() {

        const tasks: Array<TaskModel> = this.props.store.tasks;
        const filter: TodoFilter = this.props.viewModel.filter;

        return (
            <div className="task-list">
                <DataGrid  footer={this.renderFooter()}>
                    <colgroup>
                        <col width={80}/>
                        <col/>
                        <col width={80}/>
                    </colgroup>
                    <DataGridHeader>
                        <TaskHeaderRow store={this.props.store}/>
                    </DataGridHeader>
                    <DataGridBody loading={this.props.viewModel.loading}>
                        {tasks.filter(model => filter == TodoFilter.ALL || (filter == TodoFilter.COMPLETED && model.done) || (filter == TodoFilter.ACTIVE && !model.done))
                            .map(model => <TaskRow key={model.id} model={model} onRemoveTask={this.removeTask}/>)}
                    </DataGridBody>
                </DataGrid>
            </div>
        );
    }

    private renderFooter() {
        return <TaskFooter viewModel={this.props.viewModel} store={this.props.store}/>
    }
}
