
export interface QueryType {
  listing: Listing | null;
  organization: Organization | null;
  persons: Array<Person> | null;
  listingSearch: Array<SearchItem> | null;
  listingSearchPaged: SearchConnection | null;
}

export interface ListingQueryTypeArgs {
  id: string;
}

export interface OrganizationQueryTypeArgs {
  id: string;
}

export interface ListingSearchQueryTypeArgs {
  searchQuery: string;
}

export interface ListingSearchPagedQueryTypeArgs {
  searchQuery: string;
  before: string | null;
  after: string | null;
  first: number | null;
  last: number | null;
}

export interface Listing {
  id: string;
  name: string | null;
  longName: string | null;
  currencyCode: string | null;
  type: string | null;
  roundLot: number | null;
  listingDate: DateTime | null;
  quotes: Quotes | null;
  orderbook: OrderBook | null;
  issuer: Organization | null;
}

export type DateTime = any;

export interface Quotes {
  lastUpdated: DateTime | null;
  openPrice: number | null;
  lowPrice: number | null;
  lastPrice: number | null;
  askPrice: number | null;
  bidPrice: number | null;
  highPrice: number | null;
  tradedVolume: number | null;
  tradedAmount: number | null;
}

export interface OrderBook {
  lastUpdated: DateTime | null;
  state: string | null;
  levels: Array<OrderLevel> | null;
}

export interface OrderLevel {
  level: number | null;
  askPrice: number | null;
  askVolume: number | null;
  askOrders: number | null;
  bidPrice: number | null;
  bidVolume: number | null;
  bidOrders: number | null;
}

export interface Organization {
  id: string;
  name: string | null;
  countryCode: string | null;
  industryClassification: Sector | null;
  subIndustryClassification: Sector | null;
  mostLiquidEquity: Listing | null;
}

export interface Sector {
  code: string | null;
  name: string | null;
}

export interface Person {
  socialSecurityId: number | null;
  firstName: string | null;
  lastName: string | null;
}

export interface SearchItem {
  id: string | null;
  score: number | null;
  name: string | null;
  longName: string | null;
  listing: Listing | null;
}

export interface SearchConnection {
  edges: Array<SearchEdge> | null;
  pageInfo: PageInfo;
}

export interface SearchEdge {
  node: SearchItem | null;
  cursor: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface MutationType {
  addPerson: Person | null;
  removePerson: Person | null;
}

export interface AddPersonMutationTypeArgs {
  person: PersonInput;
}

export interface RemovePersonMutationTypeArgs {
  socialSecurityId: number;
}

export interface PersonInput {
  socialSecurityId: number;
  firstName: string;
  lastName: string;
}
