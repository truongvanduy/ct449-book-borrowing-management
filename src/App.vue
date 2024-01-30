<script setup>
import TheNavigation from './components/TheNavigation.vue'
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <div class="wrapper">
    <TheHeader />
    <main class="main">
      <TheNavigation />
      <!-- <TheContent /> -->
      <div class="pane">
        <div class="scroll-wrapper">
          <div class="content">
            <router-view />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
md-list div[slot='headline'] {
  font-weight: 900;
}
</style>
