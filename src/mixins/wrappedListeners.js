export default {
  methods: {
    wrappedListeners (listeners = {}, ...args) {
      return Object.keys(listeners).reduce((acc, val) => {
        acc[val] = event => listeners[val].apply(this, [event].concat(args))
        return acc
      }, {})
    }
  }
}
