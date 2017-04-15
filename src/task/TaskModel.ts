import {action, computed, observable} from "mobx";

export class TaskModel {
    id: string = TaskModel.nextId().toString();
    @observable title: string = "";
    @observable completed: boolean = false;


    constructor(title: string = '', done: boolean = false) {
        this.setTitle(title);
        this.setCompleted(done);
    }

    @computed get isValid(): boolean {
        // a title is required
        return this.title !== ''
    }

    @action
    setCompleted(done: boolean) {
        this.completed = done;
    }

    @action
    setTitle(text: string) {
        this.title = text;
    }

    // this two methods will toJson and fromJson the todo
    // to keep the example clean I have completed them, but you should consider using
    // https://github.com/mobxjs/serializr
    toJson() : object {
        return {
            id: this.id,
            text: this.title,
            done: this.completed
        }
    }

    static fromJson(json: Object) {
        const todo = new TaskModel();
        todo.id = json['id'] || TaskModel.nextId();
        todo.title = json['title'] || '';
        todo.completed = json['completed'] || false;
        return todo
    }

    static _nextId = Date.now();
    private static nextId(): number {
        TaskModel._nextId++;
        return TaskModel._nextId
    }
}
//
// function* idMaker() {
//     var index = 0;
//     while(true)
//         yield index++;
// }