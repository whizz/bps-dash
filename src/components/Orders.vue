<template>
  <v-card class="ma-3">
    <v-toolbar>
      <v-toolbar-title>Orders</v-toolbar-title>
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
              <th class="text-left">Timestamp</th>
              <th class="text-left">Qty</th>
              <th class="text-left">Price</th>
              <th class="text-left">Remaining</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orders" v-bind:key="item.orderId">
              <td>{{ item.timestamp | dateformat }}</td>
              <td class="text-right">
                {{ (item.side == "Sell" ? 1 : -1) * item.orderQty }}
              </td>
              <td class="text-right">{{ item.price | usdformat }}</td>
              <td class="text-right">
                {{ (item.side == "Sell" ? 1 : -1) * item.leavesQty }}
              </td>
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
  name: "Orders",
  data() {
    return {
      timer: ""
    };
  },
  computed: mapState({
    orders: state => state.orders,
    status: state => state.loadingStatus.Orders
  }),
  created() {
    this.update();
    this.timer = setInterval(this.update, this.$store.state.settings.refresh);
  },
  methods: {
    update() {
      this.$store.dispatch("fetchOrders");
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped></style>
