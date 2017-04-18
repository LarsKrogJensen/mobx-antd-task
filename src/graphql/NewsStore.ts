import DataApi from "../api/DataApi"

export default class NewsStore {

    public readonly dataApi: DataApi;

    constructor(dataApi: DataApi) {
        this.dataApi = dataApi;
    }
}
