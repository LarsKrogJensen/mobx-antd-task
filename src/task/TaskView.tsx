import TaskToolbar from "./TaskToolbar";
import {observer} from "mobx-react";
import TaskViewModel from "./TaskViewModel";
import {TaskStore} from "./TaskStore";
import * as React from "react";
import TaskList from "./TaskList";
import {STORE_TASK} from "../constants/stores";
import {inject} from "mobx-react/custom";
import "./task.less"

interface TaskViewProps {
    // injected
    //store: TaskStore
    // viewModel: TaskViewModel
}

@inject(STORE_TASK)
@observer
export default class TaskView extends React.Component<TaskViewProps, {}> {
    private viewModel = new TaskViewModel();
    render() {
        const store: TaskStore = this.props[STORE_TASK];

        return <div>
            <TaskToolbar viewModel={this.viewModel} store={store}/>
            <TaskList viewModel={this.viewModel} store={store}/>
        </div>
    }
}
