import {action, computed, observable} from "mobx"

export class TaskModel {
    public readonly id: number
    @observable public title: string = ""
    @observable public completed: boolean = false


    constructor(id: number, title: string = '', done: boolean = false) {
        this.id = id
        this.setTitle(title)
        this.setCompleted(done)
    }

    @action
    public setCompleted(done: boolean) {
        this.completed = done
    }

    @action
    public setTitle(text: string) {
        this.title = text
    }
}
