import * as React from "react"
import {Input} from "antd"
import SearchStore from "./SearchStore"
import {autobind, debounce} from "core-decorators"

const Search = Input.Search;

interface ISearchBarProps {
    store: SearchStore
}

export default class SearchBar extends React.Component<ISearchBarProps, {}> {
    public render() {
        const store: SearchStore = this.props.store

        return (
            <Search
                placeholder="input search text"
                style={{width: 200}}
                defaultValue={store.searchQuery}
                onChange={this.onSearchTextChanged}
                onSearch={(value: any) => console.log(value)}/>
        )
    }

    @autobind
    private onSearchTextChanged(e) {
        this.searchThrottled(e.target.value)
    }

    @debounce(300)
    private searchThrottled(query: string) {
        const store: SearchStore = this.props.store
        store.search(query)
    }
}
