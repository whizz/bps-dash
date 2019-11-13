export default {

  updateSetting(state, payload) {
    state.settings[payload.key] = payload.value;
  },

  updateBalance(state, payload) {
    state.balance = payload;
  },

  updateFunding(state, payload) {
    state.funding = payload;
  },

  updatePosition(state, payload) {
    state.position = payload;
    state.havePosition = payload ? true : false;
  },

  startLoading(state, component) {
    state.loadingStatus[component] = "loading";
  },

  stopLoading(state, component) {
    state.loadingStatus[component] = "idle";
  },
  
  errorLoading(state, component) {
    state.loadingStatus[component] = "error";
  }
}
