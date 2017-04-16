import ApolloClient, {ApolloQueryResult, createNetworkInterface, WatchQueryOptions} from 'apollo-client'
import gql from 'graphql-tag'
import {QueryType, SearchItem} from "./typings"
import {SEARCH} from "./queries"

export default class DataApi {
    private readonly client: ApolloClient

    constructor() {
        const networkInterface = createNetworkInterface({uri: 'https://larskj-gql.herokuapp.com/graphql'})
        networkInterface.use([{
            applyMiddleware(req, next) {
                if (!req.options.headers) {
                    req.options.headers = {}  // Create the header object if needed.
                }
                req.options.headers['authorization'] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJPaWtLQWZxSFkyeHBaVzUwU1VSQ2MybDRpMk55WldGMGFXOXVWR2x0WlZ3eU1ERTNMVEEwTFRFMlZERXpPakUzT2pNM0xqVTROeXN3TWpvd01Qcz0uNDU5YjcwOTA4OWEzMGZmYTJlOTg2YWQzMWY3Njc1MzU4MTcwNjg3MSIsImlhdCI6MTQ5MjM0MTQ1NywiZXhwIjoxNDkyMzQ0NzU3fQ==.fdvl9RKvzPBwJUfeCFz-pCkKCi5JCPrcZOFOtj8ysLs="
                next()
            }
        }])
        this.client = new ApolloClient({
            networkInterface,
        })
    }

    public search(query: string): Promise<SearchItem[]> {
        const options: WatchQueryOptions = {
            query: SEARCH(query),
        }

        return this.client.query(options)
            .then((response: ApolloQueryResult<QueryType>) => response.data.listingSearch)
            .catch(error => console.error(error))

    }
}

// interface ISearchResponse {
//     listingSearch: SearchItem[]
// }
