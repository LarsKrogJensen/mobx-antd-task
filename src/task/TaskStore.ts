import {action, autorun, computed, IReactionDisposer, observable} from "mobx";
import {TaskModel} from "./TaskModel";
import TaskApi from "./TaskApi";

export class TaskStore {
    private api: TaskApi;

    private readonly watchers: Map<number, IReactionDisposer> = new Map();

    @observable
    readonly tasks: Array<TaskModel> = []

    @observable
    loading: boolean = false;

    @observable
    saving: boolean = false;

    constructor(api: TaskApi = new TaskApi) {
        this.api = api;
        this.load()
        this.remove = this.remove.bind(this)
    }

    @action
    toggleLoading() {
        this.loading = !this.loading;
    }

    @action
    replaceAll(tasks: Array<TaskModel>) {
        this.watchers.forEach((value: IReactionDisposer) => value());
        this.watchers.clear();
        this.tasks.splice(0, this.tasks.length)

        tasks.forEach(task => {
            this.addTask(task)
        })
    }

    private watchTask(task: TaskModel) {
        // const disposer = autorun(() => {
        //     this.api.updateTask(task)
        // });
        // this.watchers.set(task.id, disposer);
    }

    @action
    setLoading(loading: boolean) {
        this.loading = loading;
    }

    @action
    setSaving(saving: boolean) {
        this.saving = saving;
    }

    update(model: TaskModel, dispatcher: (model:TaskModel) => void) {
        dispatcher(model);
        this.api.updateTask(model);
    }

    @action
    load() {
        this.setLoading(true)

        this.api.loadTasks()
            .then(tasks => this.replaceAll(tasks))
            .catch(reason => console.log(reason))
            .then(_ => this.setLoading(false))
    }


    public createTask() {
        this.setSaving(true)
        this.api.newTask()
            .then(model => this.addTask(model))
            .catch(reason => console.error("Failed to create task: " + reason))
            .then(_ => this.setSaving(false))
    }

    @action
    private addTask(model: TaskModel) {
        this.tasks.push(model)
        this.watchTask(model)
    }

    @action
    remove(task: TaskModel) {
        let indexOf = this.tasks.indexOf(task);
        if (indexOf > -1) {
            let disposer = this.watchers.get(task.id);
            if (disposer) {
                disposer()
                this.watchers.delete(task.id)
            }
            this.api.deleteTask(task)

            this.tasks.splice(indexOf, 1)
        }
    }

    @computed get activeTodoCount(): number {
        return this.tasks.reduce(
            (sum, todo) => sum + (todo.completed ? 0 : 1),
            0
        )
    }

    @computed get completedCount(): number {
        return this.tasks.length - this.activeTodoCount;
    }
}