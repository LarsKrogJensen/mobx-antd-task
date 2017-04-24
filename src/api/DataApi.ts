import ApolloClient, {ApolloQueryResult, createNetworkInterface, WatchQueryOptions} from 'apollo-client'
import {QueryType, SearchItem} from "./typings"
import AuthApi from "./AuthApi"
import {API_URL} from "./apiConf"
import {Subject} from "rxjs/Subject"
const searchQuery = require("./search.graphql")

export default class DataApi {
    private readonly client: ApolloClient
    private readonly authApi: AuthApi
    private webSocket: WebSocket
    private readonly publisher: Subject<any>

    constructor(authApi: AuthApi) {
        this.authApi = authApi
        const networkInterface = createNetworkInterface({uri: API_URL + "/graphql"})
        networkInterface.use([{
            applyMiddleware(req, next) {
                if (!req.options.headers) {
                    req.options.headers = {}  // Create the header object if needed.
                }
                req.options.headers['authorization'] = 'Bearer ' + authApi.accessToken
                next()
            }
        }])
        this.publisher = new Subject()
        this.client = new ApolloClient({
            networkInterface,
            connectToDevTools: true
        })
        this.connect()

    }

    public search(query: string): Promise<SearchItem[]> {
        const options: WatchQueryOptions = {
            query: searchQuery,
            variables: {query}
        }

        return this.client.query(options)
            .then((response: ApolloQueryResult<QueryType>) => response.data.listingSearch)
            .catch(error => console.error(error))

    }

    public graphQLFetcher(graphQLParams: any) {
        // const docNode = gql`${graphQLParams.query}`
        // const options: WatchQueryOptions = {
        //     query: docNode,
        //     variables: graphQLParams.variables
        // }
        //
        // return this.client.query(options)
        //     .then((response: ApolloQueryResult<QueryType>) => response.data)

        // return fetch(API_URL + '/graphql', {
        //     body: JSON.stringify(graphQLParams),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'authorization': 'Bearer ' + this.authApi.accessToken
        //     },
        //     method: 'post',
        // }).then(response => response.json())
        //
        this.webSocket.send(JSON.stringify(graphQLParams))
        return this.publisher
    }

    private connect() {
        this.webSocket = new WebSocket("ws://localhost:8080/mockqlws")
        this.webSocket.onopen = (e: Event) => {
            console.log("ws open")
        }
        this.webSocket.onclose = (e: Event) => {
            console.log("ws close")
            setTimeout(() => this.connect(), 1000)
        }
        this.webSocket.onerror = (e: Event) => {
            console.log("ws error")
        }
        this.webSocket.onmessage = (e: MessageEvent) => {
            this.publisher.next(JSON.parse(e.data))
        }
    }
}
