import {action, observable} from "mobx"
import DataApi from "../api/DataApi"
import {SearchItem} from "../api/typings"
export default class SearchStore {
    @observable
    public searchQuery: string = ''
    
    @observable
    public searchResult: SearchItem[] = []

    @observable
    public searching: boolean = false

    private readonly api: DataApi

    constructor(api: DataApi) {
        this.api = api
    }

    @action
    public search(query: string) {
        console.log("Searching for: " + query)
        this.searchQuery = query;
        this.searching = true
        this.api.search(query)
            .then(result => this.handleResult(result))
            .catch(reason => console.log(reason))
            .then(_ => this.setSearching(false))
    }

    @action
    private handleResult(result: SearchItem[]) {
        this.searchResult = result
    }

    @action
    private setSearching(searching: boolean) {
        this.searching = false
    }
}
