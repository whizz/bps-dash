<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="10">
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Settings</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-text-field v-model="bitmexKey" label="API Key"></v-text-field>
              <v-text-field v-model="bitmexSecret" label="API Secret"></v-text-field>
              <v-text-field v-model="proxy" label="CORS proxy"></v-text-field>
              <v-radio-group v-model="net">
                <v-radio label="Testnet" value="test"></v-radio>
                <v-radio label="Mainnet" value="main"></v-radio>
              </v-radio-group>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Settings",
  computed: {
    bitmexKey: {
      get() {
        return this.$store.state.settings.bitmexKey;
      },
      set(value) {
        this.$store.commit("updateSetting", { key: "bitmexKey", value });
      }
    },
    bitmexSecret: {
      get() {
        return this.$store.state.settings.bitmexSecret;
      },
      set(value) {
        this.$store.commit("updateSetting", { key: "bitmexSecret", value });
      }
    },
    net: {
      get() {
        return this.$store.state.settings.net;
      },
      set(value) {
        this.$store.commit("updateSetting", { key: "net", value });
      }
    },
    proxy: {
      get() {
        return this.$store.state.settings.proxy;
      },
      set(value) {
        this.$store.commit("updateSetting", { key: "proxy", value });
      }
    }
  }
};
</script>
