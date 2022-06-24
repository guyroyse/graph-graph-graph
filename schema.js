import { gql } from 'apollo-server'

export default gql`

  type State {
    name: String,
    abbreviation: String
  }

  type Query {
    state(state: String!): State
    states: [State]
  }
`
