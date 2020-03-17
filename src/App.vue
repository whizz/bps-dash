<template>
  <v-app>
    <app-navigation></app-navigation>

    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppNavigation from "@/components/AppNavigation";

export default {
  data() {
    return { title: "BPS Dashboard" };
  },
  name: "App",
  components: {
    AppNavigation
  },
  watch: {
    $route(to) {
      document.title = "BPS Dashboard | " + to.meta.title;
    }
  }
};
</script>

<style></style>
