import City from '../models/city.js'
import State from '../models/state.js'

export default class HauntedPlacesDataSource {

  async fetchState(state) {
    return State.fetch(state)
  }

  async fetchStates() {
    return State.fetchAll()
  }

  async fetchCity(city, state) {
    return City.fetchCity(city, state)
  }
}
