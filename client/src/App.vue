<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <keep-alive include="account">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
@import "https://cdn.jsdelivr.net/fontawesome/4.7.0/css/font-awesome.min.css";
</style>
