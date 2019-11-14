import {
  bitmexFetchBalance,
  bitmexFetchFunding,
  bitmexFetchPosition,
  bitmexFetchWalletHistory
} from "./bitmex";

export default {
  async fetchBalance({ state, commit }) {
    const component = "Balance";
    commit("startLoading", component);
    try {
      let balance = await bitmexFetchBalance(state);
      commit("stopLoading", component);
      commit("updateBalance", balance);
    } catch (e) {
      commit("errorLoading", component);
    }
  },

  async fetchFunding({ state, commit }) {
    const component = "Funding";
    commit("startLoading", component);
    try {
      let funding = await bitmexFetchFunding(state);
      commit("stopLoading", component);
      commit("updateFunding", funding);
    } catch (e) {
      commit("errorLoading", component);
    }
  },

  async fetchPosition({ state, commit }) {
    const component = "Position";
    commit("startLoading", component);
    try {
      let position = await bitmexFetchPosition(state);
      commit("stopLoading", component);
      commit("updatePosition", position || null);
    } catch (e) {
      commit("errorLoading", component);
    }
  },

  async fetchWalletHistory({ state, commit }) {
    const component = "WalletHistory";
    commit("startLoading", component);
    try {
      let history = await bitmexFetchWalletHistory(state);
      commit("stopLoading", component);
      commit("updateWalletHistory", history);
    } catch (e) {
      commit("errorLoading", component);
    }
  }
};
