import { gql } from 'apollo-server'

export default gql`

  type State {
    name: String
    abbreviation: String
    cities: [City]
  }

  type City {
    name: String
    state: State
  }

  type Query {
    state(state: String!): State
    states: [State]
    city(city: String!, state: String!): City
  }
`
