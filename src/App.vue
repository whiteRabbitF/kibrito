<template>
  <div id="app">
    <LanguageSwitcher />
    <router-view />
  </div>
</template>

<script setup>
import LanguageSwitcher from '@src/components/LanguageSwitcher.vue';
</script>

<style>
#app {
  font-family: Nunito Sans, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  font-weight: 200;
}
</style>