import * as React from "react"
import {Icon} from "antd"
import {CSSProperties} from "react"
import {STORE_NEWS} from "../constants/stores"
import {inject} from "mobx-react"
import "graphiql/graphiql.css"
import NewsStore from "./NewsStore"
import {RouteComponentProps} from "react-router"
const GraphiQL = require("graphiql")

export interface INewsProps extends RouteComponentProps<void> {

}

@inject(STORE_NEWS)
export default class NewsView extends React.Component<INewsProps, {}> {
    public render() {
        const store = this.props[STORE_NEWS] as NewsStore

        const style: CSSProperties = {
            height: 'calc(100vh - 64px)',
            margin: 0,
            overflow: "hidden",
            width: '100%',
        }

        return (
            <div style={style}>
                <GraphiQL fetcher={(query: any) => store.dataApi.fetchData(query)}>
                    <GraphiQL.Logo>
                        <div id="logo">
                            <Icon type="laptop"/>
                            <div style={{display: "inline", paddingLeft: "16px"}}>Query Console</div>
                        </div>
                    </GraphiQL.Logo>
                </GraphiQL>
            </div>
        )
    }
}
