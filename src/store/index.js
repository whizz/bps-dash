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
      refresh: 30000,
      loadingBalance: false,
      loadingFunding: false,
      loadingPosition: false
    },
    balance: {}
  },
  mutations: {
    updateSetting(state, payload) {
      state.settings[payload.key] = payload.value;
    },
    updateBalance(state, payload) {
      state.balance = payload;
      state.loadingBalance = false;
    },
    updateFunding(state, payload) {
      state.funding = payload;
      state.loadingFunding = false;
    },
    updatePosition(state, payload) {
      state.position = payload;
      state.loadingPosition = false;
    }
  },
  actions: {
    async fetchBalance({ state, commit }) {
      let exchange = bitmex(state);
      state.loadingBalance = true;
      let balance = await exchange.fetchBalance();
      commit("updateBalance", balance.info[0]);
    },
    async fetchFunding({ state, commit }) {
      let exchange = bitmex(state);
      state.loadingFunding = true;
      let funding = await exchange.publicGetInstrument({
        filter: {
          state: "Open"
        },
        symbol: "XBTUSD"
      });
      commit("updateFunding", funding[0]);
    },
    async fetchPosition({ state, commit }) {
      let exchange = bitmex(state);
      state.loadingPosition = true;
      let positions = await exchange.privateGetPosition({
        filter: {
          isOpen: true,
          symbol: "XBTUSD"
        }
      });
      commit("updatePosition", positions[0]);
    }
  },
  modules: {},
  plugins: [vuexLocal.plugin]
});
