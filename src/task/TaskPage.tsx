import {Alert} from "antd";
import {observer} from "mobx-react";
import {inject} from "mobx-react/custom";
import * as React from "react";
import {PAGE_TASK} from "../constants/pageModels";
import {STORE_TASK} from "../constants/stores";
import "./task.less"
import TaskList from "./TaskList";
import TaskPageModel from "./TaskPageModel";
import {TaskStore} from "./TaskStore";
import TaskToolbar from "./TaskToolbar";

interface ITaskPageProps {
    // injected
    // store: TaskStore
    // viewModel: TaskPageModel
}

@inject(STORE_TASK, PAGE_TASK)
@observer
export default class TaskPage extends React.Component<ITaskPageProps, {}> {

    public render() {
        const store: TaskStore = this.props[STORE_TASK];
        const pageModel: TaskPageModel = this.props[PAGE_TASK];

        return <div>
            {store.errorMessage &&
                <Alert className="task-view-alert"
                       message="Error"
                       description={store.errorMessage}
                       type="error"
                       showIcon/>
            }
            <TaskToolbar viewModel={pageModel} store={store}/>
            <TaskList viewModel={pageModel} store={store}/>
        </div>
    }
}
