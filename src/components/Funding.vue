<template>
  <v-card class="ma-3">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Funding</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-container>
        <v-row dense>
          <v-col cols="6">Current funding rate</v-col>
          <v-col cols="6" class="text-right">{{ fundingRate | pctformat }}</v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6"> - translates to approx</v-col>
          <v-col cols="6" class="text-right">{{ fundingRatePA | pctformat }} p.a.</v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6">Next funding at</v-col>
          <v-col cols="6" class="text-right">{{ fundingTime | timeformat }}</v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6">You'll earn</v-col>
          <v-col cols="6" class="text-right">{{ positionFunding | satsformat }}</v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6">Predicted next rate</v-col>
          <v-col cols="6" class="text-right">{{ fundingNext | pctformat }}</v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Funding",
  computed: mapState({
    fundingRate: state => state.funding.fundingRate,
    fundingRatePA: state => state.funding.fundingRate*3*365,
    fundingTime: state => state.funding.fundingTimestamp,
    positionFunding: state => Math.round(state.position.markValue*state.funding.fundingRate),
    fundingNext: state => state.funding.indicativeFundingRate
  })
};
</script>

<style scoped>
</style>
