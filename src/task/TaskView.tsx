import TaskToolbar from "./TaskToolbar";
import {observer} from "mobx-react";
import TaskViewModel from "./TaskViewModel";
import {TaskStore} from "./TaskStore";
import * as React from "react";
import TaskList from "./TaskList";

interface TaskViewProps {
    store: TaskStore
    viewModel: TaskViewModel
}

@observer
export default class TaskView extends React.Component<TaskViewProps, {}> {

    render() {
        const {store, viewModel} = this.props;
        return <div>
            <TaskToolbar viewModel={viewModel} store={store}/>
            <TaskList viewModel={viewModel} store={store}/>
        </div>
    }
}
