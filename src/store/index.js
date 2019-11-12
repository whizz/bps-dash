import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import ccxt from "ccxt";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

function bitmex(state) {
  let options = {
    apiKey: state.settings.bitmexKey,
    secret: state.settings.bitmexSecret
  };
  let exchange = new ccxt.bitmex(options);
  exchange.urls["api"] = state.settings.urls[state.settings.net];
  exchange.proxy = state.settings.proxy;
  return exchange;
}

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
      let exchange = bitmex(state);
      const component = "Balance";
      commit("startLoading", component);
      try {
        let balance = await exchange.fetchBalance();
        commit("stopLoading", component);
        commit("updateBalance", balance.info[0]);
      } catch (e) {
        commit("errorLoading", component);
      }
    },
    async fetchFunding({ state, commit }) {
      let exchange = bitmex(state);
      const component = "Funding";
      commit("startLoading", component);
      try {
        let funding = await exchange.publicGetInstrument({
          filter: {
            state: "Open"
          },
          symbol: "XBTUSD"
        });
        commit("stopLoading", component);
        commit("updateFunding", funding[0]);
      } catch (e) {
        commit("errorLoading", component);
      }
    },
    async fetchPosition({ state, commit }) {
      let exchange = bitmex(state);
      const component = "Position";
      commit("startLoading", component);
      try {
        let positions = await exchange.privateGetPosition({
          filter: {
            isOpen: true,
            symbol: "XBTUSD"
          }
        });
        commit("stopLoading", component);
        commit("updatePosition", positions.length>=0 ? positions[0] : null);
      } catch (e) {
        commit("errorLoading", component);
      }
    }
  },
  modules: {},
  plugins: [vuexLocal.plugin]
});
