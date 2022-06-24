export default {
  Query: {
    state: async (parent, args, context) => {
      let { state } = args
      let { hauntedPlaces } = context.dataSources
      return await hauntedPlaces.fetchState(state)
    },

    states: async (parent, args, context) => {
      let { hauntedPlaces } = context.dataSources
      return await hauntedPlaces.fetchStates()
    }
  }
}
