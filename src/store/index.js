import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import actions from "./actions";
import mutations from "./mutations";

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
      refresh: 60000,
      dark: true
    },
    loadingStatus: {
      Balance: "idle",
      Funding: "idle",
      Position: "idle",
      WalletHistory: "idle"
    },
    balance: {},
    funding: {},
    position: {},
    walletHistory: [],
    havePosition: false
  },
  mutations,
  actions,
  modules: {},
  plugins: [vuexLocal.plugin]
});
