import ApolloClient, {ApolloQueryResult, createNetworkInterface, WatchQueryOptions} from 'apollo-client'
import {QueryType, SearchItem} from "./typings"
import AuthApi from "./AuthApi"
import {API_URL, WS_URL} from "./apiConf"
import {Subject} from "rxjs/Subject"
import {addGraphQLSubscriptions, SubscriptionClient} from "subscriptions-transport-ws"
import {graphQLFetcher} from "graphiql-subscriptions-fetcher/dist/fetcher"
import {autobind} from "core-decorators"
import {Observable} from "rxjs/Rx"
const searchQuery = require("./search.graphql")

export default class DataApi {
    private readonly subscriptionClient: SubscriptionClient
    private readonly client: ApolloClient
    private readonly authApi: AuthApi
    private webSocket: WebSocket
    private publisher: Subject<JSON>


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

        // this.subscriptionClient = new SubscriptionClient(WS_URL + "/mockqlws", {
        //     connectionParams: {
        //         // Pass any arguments you want for initialization
        //     },
        //     reconnect: true
        // });
        // Extend the network interface with the WebSocket
        // const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
        //     networkInterface,
        //     this.subscriptionClient
        // );

        this.client = new ApolloClient({
            connectToDevTools: true,
            networkInterface
            // networkInterface: networkInterfaceWithSubscriptions
        })


        // old style ws client
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

    public fetchData(graphQLParams: any) {
        // const docNode = gql`${graphQLParams.query}`
        // const options: WatchQueryOptions = {
        //     query: docNode,
        //     variables: graphQLParams.variables
        // }
        //
        // return this.client.query(options)
        //     .then((response: ApolloQueryResult<QueryType>) => response.data)

        // return graphQLFetcher(this.subscriptionClient, this.fallbackFetcher)(graphQLParams)
        //
        // Observable.fromEvent(document, 'click')
        // .filter(c => c.clientX > window.innerWidth / 2)
        // .take(10)
        // .subscribe(c =>{
        //     console.log(c.clientX, c.clientY)
        // })

        // this.webSocket.
        // this.webSocket.send(JSON.stringify(graphQLParams))
        // return this.publisher
        return this.fallbackFetcher(graphQLParams)
    }

    @autobind
    private fallbackFetcher(graphQLParams: any) {
        return fetch(API_URL + '/graphql', {
            body: JSON.stringify(graphQLParams),
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + this.authApi.accessToken
            },
            method: 'post',
        }).then(response => response.json())
    }

    private connect() {
        if (!this.publisher) {
            this.publisher = new Subject()
        }

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
