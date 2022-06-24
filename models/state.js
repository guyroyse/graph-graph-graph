import { querySingle, queryMany } from '../redis/redis.js'

export default class State {

  static async fetch(abbreviation) {
    const stateData = await querySingle('haunted:place', `
      MATCH (s:State)
      WHERE s.abbreviation = '${abbreviation}'
      RETURN s.abbreviation AS abbreviation, s.name AS name
    `)

    if (!stateData) return;

    const state = new State()
    state._name = stateData.name
    state._abbreviation = stateData.abbreviation
    return state
  }

  static async fetchAll() {
    const stateData = await queryMany('haunted:place', `
      MATCH (s:State)
      RETURN s.abbreviation AS abbreviation, s.name AS name
    `)

    return stateData.map(item => {
      const state = new State()
      state._name = item.name
      state._abbreviation = item.abbreviation
      return state
    })
  }

  get name() { return this._name }
  get abbreviation() { return this._abbreviation }
}
