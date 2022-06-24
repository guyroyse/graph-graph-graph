import State from './models/state.js'

export default class HauntedPlacesDataSource {

  constructor(redis) {
    this.redis = redis
  }

  async fetchState(state) {
    return State.fetch(state)
  }

  async fetchStates(state) {
    return State.fetchAll()
  }
}
