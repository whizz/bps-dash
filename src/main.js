import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";

Vue.config.productionTip = false;

// define custom filters for formatting
Vue.filter("satsformat", function(value) {
  if (!value) return "";
  let r = "";
  if (store.state.settings.unit === "BTC") {
    r = new Intl.NumberFormat("en-US", {
      minimumSignificantDigits: 6,
      maximumSignificantDigits: 6
    }).format(value / 100000000);
  } else {
    r = new Intl.NumberFormat("en-US", {
      notation: "compact"
    }).format(value);
  }
  r = r + " " + store.state.settings.unit;
  return r;
});

Vue.filter("usdformat", function(value) {
  if (!value) return "";
  let r = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
  return r;
});

Vue.filter("pctformat", function(value) {
  if (!value) return "";
  let r = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumSignificantDigits: 4,
    maximumSignificantDigits: 4
  }).format(value * 100);
  r = r + "%";
  return r;
});

Vue.filter("timeformat", function(value) {
  if (!value) return "";
  let r = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  }).format(new Date(value));
  return r;
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
