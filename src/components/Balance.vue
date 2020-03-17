<template>
  <v-card class="ma-3">
    <v-toolbar>
      <v-toolbar-title>BitMEX Balance</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-progress-circular
        indeterminate
        v-if="status === 'loading'"
      ></v-progress-circular>
      <v-icon v-if="status === 'error'">mdi-alert-circle-outline</v-icon>
    </v-toolbar>
    <v-card-text>
      <v-container>
        <v-row dense>
          <v-col cols="6">Wallet Balance</v-col>
          <v-col cols="6" class="text-right">{{
            walletBalance | satsformat
          }}</v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6">Unrealised gain/loss</v-col>
          <v-col cols="6" class="text-right">{{
            unrealisedPNL | satsformat
          }}</v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6">Margin Balance</v-col>
          <v-col cols="6" class="text-right">{{
            marginBalance | satsformat
          }}</v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6">Position Margin</v-col>
          <v-col cols="6" class="text-right">{{
            positionMargin | satsformat
          }}</v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6">Available Balance</v-col>
          <v-col cols="6" class="text-right">{{
            availableBalance | satsformat
          }}</v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Balance",
  data() {
    return {
      timer: ""
    };
  },
  computed: mapState({
    walletBalance: state => state.balance.walletBalance,
    unrealisedPNL: state => state.balance.unrealisedPnl,
    marginBalance: state => state.balance.marginBalance,
    positionMargin: state => state.balance.maintMargin,
    availableBalance: state => state.balance.availableMargin,
    status: state => state.loadingStatus.Balance
  }),
  created() {
    this.update();
    this.timer = setInterval(this.update, this.$store.state.settings.refresh);
  },
  methods: {
    update() {
      this.$store.dispatch("fetchBalance");
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped></style>
