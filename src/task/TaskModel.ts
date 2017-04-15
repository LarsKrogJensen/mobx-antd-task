import {action, computed, observable} from "mobx";

export class TaskModel {
   readonly id: number;
    @observable title: string = "";
    @observable completed: boolean = false;


    constructor(id: number, title: string = '', done: boolean = false) {
        this.id = id;
        this.setTitle(title);
        this.setCompleted(done);
    }

    @action
    setCompleted(done: boolean) {
        this.completed = done;
    }

    @action
    setTitle(text: string) {
        this.title = text;
    }

}