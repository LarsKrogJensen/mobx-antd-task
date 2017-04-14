import {action, observable} from "mobx";
import {TodoFilter} from "../constants/todos";

export default class TaskViewModel {

    @observable
    loading: boolean = false;
    @observable
    filter: TodoFilter = TodoFilter.ALL

    @action
    toggleLoading() {
        this.loading = !this.loading;
    }

    @action
    setFilter(filter: TodoFilter) {
        this.filter = filter;
    }
}