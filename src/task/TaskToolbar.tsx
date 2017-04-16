import {Button, Radio} from "antd"
import {autobind} from "core-decorators"
import {observer} from "mobx-react"
import * as React from "react"
import TaskViewModel from "./TaskPageModel"
import {TODO_FILTER_TITLES, TodoFilter} from "./tasks"
import {TaskStore} from "./TaskStore"


interface ITaskToolbarProps {
    store: TaskStore;
    viewModel: TaskViewModel
}

@observer
export default class TaskToolbar extends React.Component<ITaskToolbarProps, {}> {

    public render() {
        const vm = this.props.viewModel
        return (
            <div className="task-toolbar">
                <Button className="task-toolbar-item"
                        type="primary"
                        loading={this.props.store.saving}
                        onClick={this.handleNewTask}>New task</Button>
                <Button className="task-toolbar-item" onClick={this.onLoadTasks}>Reload</Button>
                {/*<Button className="task-toolbar-item" onClick={this.onSaveTasks}>Save</Button>*/}
                <div className="filler"/>
                <Radio.Group value={vm.filter} onChange={this.handleFilterChange}>
                    <Radio.Button value={TodoFilter.ALL}>{TODO_FILTER_TITLES[TodoFilter.ALL]}</Radio.Button>
                    <Radio.Button value={TodoFilter.ACTIVE}>{TODO_FILTER_TITLES[TodoFilter.ACTIVE]}</Radio.Button>
                    <Radio.Button value={TodoFilter.COMPLETED}>{TODO_FILTER_TITLES[TodoFilter.COMPLETED]}</Radio.Button>
                </Radio.Group>
            </div>
        )
    }

    @autobind
    private handleNewTask(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault()
        const store: TaskStore = this.props.store
        store.createTask()
    }

    @autobind
    private handleFilterChange(e) {
        this.props.viewModel.setFilter(e.target.value)
    }



    @autobind
    private onLoadTasks(e) {
        e.preventDefault()
        this.props.store.load()
    }
}
