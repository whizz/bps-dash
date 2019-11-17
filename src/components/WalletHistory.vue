<template>
  <v-card class="ma-3">
    <v-toolbar>
      <v-toolbar-title>Profits&amp;Losses</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-progress-circular
        indeterminate
        v-if="status === 'loading'"
      ></v-progress-circular>
      <v-icon v-if="status === 'error'">mdi-alert-circle-outline</v-icon>
    </v-toolbar>
    <v-card-text>
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Date</th>
              <th class="text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in history" v-bind:key="item.transactID">
              <td>{{ item.timestamp | dateformat }}</td>
              <td class="text-right">{{ item.amount | satsformat }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "WalletHistory",
  data() {
    return {
      timer: ""
    };
  },
  computed: mapState({
    history: state => state.walletHistory,
    status: state => state.loadingStatus.WalletHistory
  }),
  created() {
    this.update();
    this.timer = setInterval(this.update, this.$store.state.settings.refresh);
  },
  methods: {
    update() {
      this.$store.dispatch("fetchWalletHistory");
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped></style>
