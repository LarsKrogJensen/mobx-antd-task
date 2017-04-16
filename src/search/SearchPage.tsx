import * as React from "react"
import {observer} from "mobx-react"
import {inject} from "mobx-react/custom"
import {STORE_SEARCH} from "../constants/stores"
import SearchList from "./SearchList"
import SearchStore from "./SearchStore"
import SearchBar from "./SearchBar"
import "./search.less"

interface ISearchPageProps {
    // search store injected
}

@inject(STORE_SEARCH)
@observer
export default class SearchPage extends React.Component<ISearchPageProps, {}> {
    public render() {
        const store: SearchStore = this.props[STORE_SEARCH]

        return (
            <div>
                <SearchBar store={store}/>
                <SearchList store={store}/>
            </div>
        )
    }
}

