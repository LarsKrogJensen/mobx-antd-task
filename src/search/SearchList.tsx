import * as React from "react"
import {Icon, Table} from "antd"
import SearchStore from "./SearchStore"
import {SearchItem} from "../api/typings"
import {observer} from "mobx-react"

interface ISearchListProps {
    store: SearchStore
}

@observer
export default class SearchList extends React.Component<ISearchListProps, {}> {
    private readonly locale = {
        emptyText: <span><Icon type="frown-o"/>Nothing found</span>,
    }

    public render() {
        const store: SearchStore = this.props.store


        return (
            <SearchTable dataSource={store.searchResult}
                         pagination={false}
                         rowKey="id"
                         loading={store.searching}
                         locale={this.locale}
                         bordered={false}
                         size="small">
                <SearchColumn title='Id'
                              key="id"
                              dataIndex='id'
                              width={100}/>
                <SearchColumn title='Score'
                              key="score"
                              dataIndex='score'
                              width={150}/>
                <SearchColumn title='Name'
                              key="name"
                              dataIndex='name'
                              width={150}/>
                <SearchColumn title='Long Name'
                              key="longName"
                              dataIndex='longName'/>
            </SearchTable>
        )
    }
}


class SearchTable extends Table<SearchItem> {
    // required by antd table
}

class SearchColumn extends Table.Column<SearchItem> {
    // required by antd table
}
