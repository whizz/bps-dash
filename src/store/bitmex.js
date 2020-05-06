import request from "request-promise-native";
import crypto from "crypto";

async function execute(state, verb, method, data) {
  const expires = Math.round(new Date().getTime() / 1000) + 60;
  const path = "/api/v1/" + method;
  const postBody = state === "GET" ? JSON.stringify(data) : "";

  var signature = crypto
    .createHmac("sha256", state.settings.bitmexSecret)
    .update(verb + path + expires + postBody)
    .digest("hex");

  var headers = {
    "content-type": "application/json",
    accept: "application/json",
    "x-requested-with": "XMLHttpRequest",
    "api-expires": expires,
    "api-key": state.settings.bitmexKey,
    "api-signature": signature
  };

  const requestOptions = {
    headers: headers,
    url: state.settings.proxy + state.settings.urls[state.settings.net] + path,
    method: verb,
    body: postBody
  };

  let result = await request(requestOptions);
  return JSON.parse(result);
}

export async function bitmexFetchBalance(state) {
  let result = await execute(state, "GET", "user/margin?currency=all");
  return result[0];
}

export async function bitmexFetchFunding(state) {
  let result = await execute(
    state,
    "GET",
    "instrument?filter%5Bstate%5D=Open&symbol=XBTUSD"
  );
  return result[0];
}

export async function bitmexFetchPosition(state) {
  let result = await execute(
    state,
    "GET",
    "position?filter%5BisOpen%5D=true&filter%5Bsymbol%5D=XBTUSD"
  );
  return result[0];
}

export async function bitmexFetchWalletHistory(state) {
  let result = await execute(state, "GET", "user/walletHistory?count=10");
  return result.filter(function(row) {
    return row.transactType === "RealisedPNL";
  });
}

export async function bitmexFetchOrders(state) {
  let result = await execute(state, "GET", "order?count=10&reverse=true");
  return result;
}
