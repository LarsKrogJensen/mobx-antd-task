import ApolloClient, {ApolloQueryResult, createNetworkInterface, WatchQueryOptions} from 'apollo-client'
import {QueryType, SearchItem} from "./typings"
import AuthApi from "./AuthApi"
import {API_URL} from "./apiConf"
import gql from "graphql-tag"
const searchQuery = require("./search.graphql")

export default class DataApi {
    private readonly client: ApolloClient
    private readonly authApi: AuthApi;

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
        this.client = new ApolloClient({
            networkInterface,
            connectToDevTools: true
        })
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

    public graphQLFetcher(graphQLParams: string) {
      return fetch(API_URL + '/graphql', {
          body: JSON.stringify(graphQLParams),
          headers: { 'Content-Type': 'application/json',
          'authorization': 'Bearer ' + this.authApi.accessToken},
          method: 'post',
      }).then(response => response.json());
    }
}
