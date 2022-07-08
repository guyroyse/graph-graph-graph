import { querySingle, queryMany } from '../redis/redis.js'
import State from './state.js'

export default class City {
    static async fetchCity(cityName, stateAbbreviation){
      const cityData = await querySingle('haunted:place',`
        MATCH (s:State)-[:CONTAINS]->(c:City)
        WHERE c.name = '${cityName}' AND s.abbreviation = '${stateAbbreviation}'
        RETURN c.name AS name, s.name AS stateName, s.abbreviation AS stateAbbreviation
      `)

      if (!cityData) return

      const state = new State()
      state._name = cityData.stateName
      state._abbreviation = cityData.stateAbbreviation

      const city = new City()
      city._name = cityData.name
      city._state = state

      return city
    }

    static async fetchCitiesForState(stateAbbreviation) {
      const cityData = await queryMany('haunted:place', `
        MATCH (s:State)-[:CONTAINS]->(c:City)
        WHERE s.abbreviation = '${stateAbbreviation}'
        RETURN c.name AS name, s.name AS stateName
      `)

      if (cityData.length === 0) return

      const state = new State()
      state._name = cityData[0].stateName
      state._abbreviation = stateAbbreviation

      return cityData.map(item => {
        const city = new City()
        city._name = item.name
        city._state = state

        return city
      })
    }

    get name() { return this._name }
    get state() { return this._state }
}
