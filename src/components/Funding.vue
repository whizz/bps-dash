<template>
  <v-card class="ma-3">
    <v-toolbar color="primary">
      <v-toolbar-title>Funding</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-progress-circular indeterminate v-if="status === 'loading'"></v-progress-circular>
      <v-icon v-if="status === 'error'">mdi-alert-circle-outline</v-icon>
    </v-toolbar>
    <v-card-text>
      <v-container>
        <v-row dense>
          <v-col cols="6">Current funding rate</v-col>
          <v-col cols="6" class="text-right">{{ fundingRate | pctformat }}</v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6">- translates to approx</v-col>
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
  data() {
    return {
      timer: ""
    };
  },
  computed: mapState({
    fundingRate: state => state.funding.fundingRate,
    fundingRatePA: state => state.funding.fundingRate * 3 * 365,
    fundingTime: state => state.funding.fundingTimestamp,
    positionFunding: state => {
      if (state.havePosition)
        return Math.round(state.position.markValue * state.funding.fundingRate);
      else
        return 0;
    },
    fundingNext: state => state.funding.indicativeFundingRate,
    status: state => state.loadingStatus.Funding
  }),
  created() {
    this.update();
    this.timer = setInterval(this.update, this.$store.state.settings.refresh);
  },
  methods: {
    update() {
      this.$store.dispatch("fetchFunding");
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
</style>
