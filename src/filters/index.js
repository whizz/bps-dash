import satsformat from "./satsformat";
import usdformat from "./usdformat";
import pctformat from "./pctformat";
import timeformat from "./timeformat";
import dateformat from "./dateformat";

export default {
  install(Vue) {
    Vue.filter("satsformat", satsformat);
    Vue.filter("usdformat", usdformat);
    Vue.filter("pctformat", pctformat);
    Vue.filter("timeformat", timeformat);
    Vue.filter("dateformat", dateformat);
  }
};