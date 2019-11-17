<template>
  <v-card class="ma-3">
    <v-toolbar>
      <v-toolbar-title>Position</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-progress-circular
        indeterminate
        v-if="status === 'loading'"
      ></v-progress-circular>
      <v-icon v-if="status === 'error'">mdi-alert-circle-outline</v-icon>
    </v-toolbar>
    <v-card-text>
      <v-container v-if="havePosition">
        <v-row dense>
          <v-col cols="6">Current position size</v-col>
          <v-col cols="6" class="text-right">{{ sizeUSD | usdformat }}</v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"></v-col>
          <v-col cols="6" class="text-right">{{ sizeBTC | satsformat }}</v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6">Average cost</v-col>
          <v-col cols="6" class="text-right">{{ avgCost | usdformat }}</v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6">Last price</v-col>
          <v-col cols="6" class="text-right">{{ lastPrice | usdformat }}</v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6">Liquidation price</v-col>
          <v-col cols="6" class="text-right">{{ liqPrice | usdformat }}</v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6">Safety margin</v-col>
          <v-col cols="6" class="text-right">{{
            safetyMargin | pctformat
          }}</v-col>
        </v-row>
      </v-container>
      <v-container v-if="!havePosition">
        You have no open position
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Position",
  data() {
    return {
      timer: ""
    };
  },
  computed: mapState({
    sizeUSD: state => state.position.currentQty,
    sizeBTC: state => state.position.posCost,
    avgCost: state => state.position.avgCostPrice,
    lastPrice: state => state.position.lastPrice,
    liqPrice: state => state.position.liquidationPrice,
    safetyMargin: state =>
      state.position.liquidationPrice / state.position.lastPrice - 1,
    status: state => state.loadingStatus.Position,
    havePosition: state => state.havePosition
  }),
  created() {
    this.update();
    this.timer = setInterval(this.update, this.$store.state.settings.refresh);
  },
  methods: {
    update() {
      this.$store.dispatch("fetchPosition");
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped></style>
