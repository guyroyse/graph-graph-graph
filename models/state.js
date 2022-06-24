export default class State {

  static async fetch(_state) {
    const state = new State()
    state._name = "Ohio"
    state._abbreviation = "OH"
    return state
  }

  static async fetchAll() {
    const ohio = new State()
    ohio._name = "Ohio"
    ohio._abbreviation = "OH"

    const kentucky = new State()
    kentucky._name = "Kentucky"
    kentucky._abbreviation = "KY"

    return [ ohio, kentucky ];
  }

  get name() { return this._name }
  get abbreviation() { return this._abbreviation }
}
