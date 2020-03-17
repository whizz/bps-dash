import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import filters from "./filters";

Vue.config.productionTip = false;

Vue.use(filters);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created: function() {
    this.$vuetify.theme.dark = store.state.settings.dark;
  }
}).$mount("#app");
