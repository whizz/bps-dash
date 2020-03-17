import vuetify from "../plugins/vuetify";

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

  updateWalletHistory(state, payload) {
    for (let i = 0; i < payload.length; i++) {
      payload[i].usdvalue =
        (payload[i].amount / 100000000) * state.funding.lastPrice;
    }
    state.walletHistory = payload;
  },

  startLoading(state, component) {
    state.loadingStatus[component] = "loading";
  },

  stopLoading(state, component) {
    state.loadingStatus[component] = "idle";
  },

  errorLoading(state, component) {
    state.loadingStatus[component] = "error";
  },

  setDarkMode(state, darkMode) {
    state.settings.dark = darkMode;
    vuetify.framework.theme.dark = darkMode;
  }
};
