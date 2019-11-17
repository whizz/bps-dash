import store from "../store";

export default function satsformat(value) {
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
}
