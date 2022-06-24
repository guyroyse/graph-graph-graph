import State from '../models/state.js'

export default class HauntedPlacesDataSource {

  async fetchState(state) {
    return State.fetch(state)
  }

  async fetchStates() {
    return State.fetchAll()
  }
}
