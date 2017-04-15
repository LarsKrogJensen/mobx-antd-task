import {action, observable} from "mobx";
import {TodoFilter} from "./tasks";

export default class TaskViewModel {

    @observable
    filter: TodoFilter = TodoFilter.ALL


    @action
    setFilter(filter: TodoFilter) {
        this.filter = filter;
    }
}