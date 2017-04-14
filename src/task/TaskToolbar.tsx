import {TaskStore} from "./TaskStore";
import {observer} from "mobx-react";
import * as React from "react";
import TaskViewModel from "./TaskViewModel";
import {Button, Checkbox, Radio} from "antd";
import {TODO_FILTER_TITLES, TodoFilter} from "../constants/todos";


interface TaskToolbarProps {
    store: TaskStore;
    viewModel: TaskViewModel
}

@observer
export default class TaskToolbar extends React.Component<TaskToolbarProps, {}> {

    constructor(props: TaskToolbarProps, context: any) {
        super(props, context);
        this.handleNewTask = this.handleNewTask.bind(this);
        this.onSaveTasks = this.onSaveTasks.bind(this);
        this.onLoadTasks = this.onLoadTasks.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    handleFilterChange(e) {
        this.props.viewModel.setFilter(e.target.value)
    }

    handleNewTask(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault()
        this.props.store.add();
    }

    onSaveTasks(e) {
        e.preventDefault()
        this.props.store.save()
    }

    onLoadTasks(e) {
        e.preventDefault()
        this.props.store.load()
    }


    render() {
        const vm = this.props.viewModel;
        return (
            <div className="task-toolbar">
                <Button className="task-toolbar-item" type="primary" onClick={this.handleNewTask}>New task</Button>
                <Button className="task-toolbar-item" onClick={this.onLoadTasks}>Load</Button>
                <Button className="task-toolbar-item" onClick={this.onSaveTasks}>Save</Button>
                <div className="filler"/>
                <Radio.Group value={vm.filter} onChange={this.handleFilterChange}>
                    <Radio.Button value={TodoFilter.ALL}>{TODO_FILTER_TITLES[TodoFilter.ALL]}</Radio.Button>
                    <Radio.Button value={TodoFilter.ACTIVE}>{TODO_FILTER_TITLES[TodoFilter.ACTIVE]}</Radio.Button>
                    <Radio.Button value={TodoFilter.COMPLETED}>{TODO_FILTER_TITLES[TodoFilter.COMPLETED]}</Radio.Button>
                </Radio.Group>
            </div>
        );
    }
}
