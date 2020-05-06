<template>
  <v-container>
    <v-btn @click="fetch()">Refresh</v-btn>
    <v-layout row wrap>
      <v-flex xs12 md6 lg4>
        <balance></balance>
      </v-flex>
      <v-flex xs12 md6 lg4>
        <funding></funding>
      </v-flex>
      <v-flex xs12 md6 lg4>
        <position></position>
      </v-flex>
      <v-flex xs12 md6 lg4>
        <walletHistory></walletHistory>
      </v-flex>
      <v-flex xs12 md6 lg4>
        <Orders></Orders>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Balance from "@/components/Balance";
import Funding from "@/components/Funding";
import Position from "@/components/Position";
import WalletHistory from "@/components/WalletHistory";
import Orders from "@/components/Orders";

export default {
  name: "home",
  components: {
    Balance,
    Funding,
    Position,
    WalletHistory,
    Orders
  },
  methods: {
    fetch() {
      this.$store.dispatch("fetchBalance");
      this.$store.dispatch("fetchFunding");
      this.$store.dispatch("fetchPosition");
      this.$store.dispatch("fetchOrders");
      this.$store.dispatch("fetchWalletHistory");
    }
  }
};
</script>
