import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import {
  bitmexFetchBalance,
  bitmexFetchFunding,
  bitmexFetchPosition
} from "./bitmex";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    settings: {
      bitmexKey: "",
      bitmexSecret: "",
      net: "test",
      proxy: "http://localhost:8081/",
      urls: {
        test: "https://testnet.bitmex.com",
        main: "https://www.bitmex.com"
      },
      unit: "sats",
      refresh: 60000
    },
    loadingStatus: {
      Balance: "idle",
      Funding: "idle",
      Position: "idle"
    },
    balance: {},
    funding: {},
    position: {},
    havePosition: false
  },
  mutations: {
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
  },
  actions: {
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
    }
  },
  modules: {},
  plugins: [vuexLocal.plugin]
});
