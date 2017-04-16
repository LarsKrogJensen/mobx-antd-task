import {observable} from "mobx";

export default class NewsStore {
    @observable
    public title: string;
}
