import gql from "graphql-tag"

export function SEARCH(query: string) {
    return gql`
    query SearchQuery {
      listingSearch(searchQuery: "${query}") {
          id
          name
          score
          longName
        }
    }
  `
}
