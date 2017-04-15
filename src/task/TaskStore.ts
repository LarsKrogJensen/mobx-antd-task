import {action, autorun, computed, observable} from "mobx";
import {TaskModel} from "./TaskModel";
import TaskApi from "./TaskApi";
import TaskList from "./TaskList";
export class TaskStore {
    private api: TaskApi;

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

        // autorun((reaction)=>  {
        //     console.log(reaction)
        //     this.tasks.forEach(task => {
        //         console.log("Saving task: " + task)
        //         api.updateTask(task);
        //     })
        // })
    }

    @action
    toggleLoading() {
        this.loading = !this.loading;
    }

    @action
    replaceAll(tasks: Array<TaskModel>) {
        this.tasks.splice(0, this.tasks.length)
        tasks.forEach(task => {
            this.tasks.push(task)

            this.watchTask(task);
        })
    }

    private watchTask(task) {
        autorun(() => {
            this.api.updateTask(task)
        })
    }

    @action
    setLoading(loading: boolean) {
        this.loading = loading;
    }

    @action
    setSaving(saving: boolean) {
        this.saving = saving;
    }


    @action
    load() {
        this.setLoading(true)

        this.api.loadTasks()
            .then(tasks => {
                this.replaceAll(tasks)
            })
            .catch(reason => {
                console.log(reason)
            })
            .then(_ => this.setLoading(false))
    }

    // @action
    // save() {
    //     // are there invalid tasks?
    //     if (this.tasks.filter(tasks => tasks.isValid === false).length > 0) {
    //         alert("Unable to save: There are invalid Todos.")
    //     }
    //
    //     // if (window.localStorage) {
    //     //     window.localStorage.setItem(
    //     //         "tasks",
    //     //         JSON.stringify(
    //     //             this.tasks.map(task => task.toJson())
    //     //         )
    //     //     )
    //     // }
    // }

    @action
    add() {
        this.setSaving(true)
        this.api.newTask()
            .then(model => {
                this.tasks.push(model)
                this.watchTask(model)
            })
            .catch(reason => console.error("Failed to create task"))
            .then(_ => this.setSaving(false))
    }

    @action
    remove(task: TaskModel) {
        let indexOf = this.tasks.indexOf(task);
        if (indexOf > -1) {
            this.tasks.splice(indexOf, 1)
            this.api.deleteTask(task)
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