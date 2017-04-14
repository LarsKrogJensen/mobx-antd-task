import {observable} from "mobx";

export default class NewsStore {
    @observable
    title: string;
}