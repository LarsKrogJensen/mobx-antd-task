import ApolloClient, {ApolloQueryResult, createNetworkInterface, WatchQueryOptions} from 'apollo-client'
import {QueryType, SearchItem} from "./typings"
import AuthApi from "./AuthApi"
import {API_URL} from "./apiConf"
const searchQuery = require("./search.graphql")

export default class DataApi {
    private readonly client: ApolloClient

    constructor(authApi: AuthApi) {
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
}
