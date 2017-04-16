import {SearchItem} from "./typings"

export default class DataApi {
    public search(query: string): Promise<SearchItem[]> {
     return Promise.resolve([])
    }
}
