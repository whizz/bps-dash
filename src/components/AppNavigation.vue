<template>
  <span>
    <v-app-bar dense>
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/">
        <v-icon>mdi-view-dashboard-outline</v-icon>
      </v-btn>
      <v-btn icon to="/about">
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
      <v-btn icon to="/settings">
        <v-icon>mdi-settings-outline</v-icon>
      </v-btn>
    </v-app-bar>
  </span>
</template>

<script>
export default {
  name: "AppNavigation",
  data() {
    return {
      appTitle: "BPS Dashboard"
    };
  }
};
</script>

<style scoped></style>
