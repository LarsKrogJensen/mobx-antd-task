import {action, observable} from "mobx";
import {TodoFilter} from "./tasks";

export default class TaskPageModel {

    @observable
    public filter: TodoFilter = TodoFilter.ALL


    @action
    public setFilter(filter: TodoFilter) {
        this.filter = filter;
    }
}
