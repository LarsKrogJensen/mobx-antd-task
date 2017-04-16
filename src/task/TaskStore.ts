import {action, computed, IReactionDisposer, observable} from "mobx"
import TaskApi from "./TaskApi"
import {TaskModel} from "./TaskModel"

export class TaskStore {
    @observable
    public readonly tasks: TaskModel[] = []

    @observable
    public loading: boolean = false

    @observable
    public saving: boolean = false

    @observable
    public errorMessage: string = ''

    private api: TaskApi
    private readonly watchers: Map<number, IReactionDisposer> = new Map()


    constructor(api: TaskApi = new TaskApi()) {
        this.api = api
        this.load()
        this.remove = this.remove.bind(this)
    }

    // @action
    // public toggleLoading() {
    //     this.loading = !this.loading
    // }

    public dispatch(model: TaskModel, dispatcher: (model: TaskModel) => void) {
        dispatcher(model)
        this.api.updateTask(model)
    }

    @action
    public load() {
        this.setLoading(true)
        this.clearErrorMessage()
        this.api.loadTasks()
            .then(tasks => this.replaceAll(tasks))
            .catch((reason: Error) => this.setErrorMessage(reason.message))
            .then(_ => this.setLoading(false))
    }

    public createTask() {
        this.setSaving(true)
        this.clearErrorMessage()
        this.api.newTask()
            .then(model => this.addTask(model))
            .catch((reason: Error) => this.setErrorMessage(reason.message))
            .then(_ => this.setSaving(false))
    }

    @action
    public remove(task: TaskModel) {
        const indexOf = this.tasks.indexOf(task)
        if (indexOf > -1) {
            const disposer = this.watchers.get(task.id)
            if (disposer) {
                disposer()
                this.watchers.delete(task.id)
            }
            this.api.deleteTask(task)

            this.tasks.splice(indexOf, 1)
        }
    }

    @action
    private replaceAll(tasks: TaskModel[]) {
        // this.watchers.forEach((value: IReactionDisposer) => value());
        // this.watchers.clear();
        this.tasks.splice(0, this.tasks.length)

        tasks.forEach(task => {
            this.addTask(task)
        })
    }

    @action
    private setLoading(loading: boolean) {
        this.loading = loading
    }

    @action
    private setSaving(saving: boolean) {
        this.saving = saving
    }

    @action
    private setErrorMessage(msg: string) {
        this.errorMessage = msg
    }

    @action
    private clearErrorMessage() {
        this.errorMessage = ''
    }

    @action
    private addTask(model: TaskModel) {
        this.tasks.push(model)
    }

    @computed get activeTodoCount(): number {
        return this.tasks.reduce((sum, todo) => sum + (todo.completed ? 0 : 1), 0)
    }

    @computed get completedCount(): number {
        return this.tasks.length - this.activeTodoCount
    }
}
