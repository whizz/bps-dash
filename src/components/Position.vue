<template>
  <v-card class="ma-3">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Position</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-container>
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
          <v-col cols="6" class="text-right">{{ safetyMargin | pctformat }}</v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Position",
  computed: mapState({
    sizeUSD: state => state.position.currentQty,
    sizeBTC: state => state.position.posCost,
    avgCost: state => state.position.avgCostPrice,
    lastPrice: state => state.position.lastPrice,
    liqPrice: state => state.position.liquidationPrice,
    safetyMargin: state => (state.position.liquidationPrice / state.position.lastPrice) - 1
  })
};
</script>

<style scoped>
</style>
