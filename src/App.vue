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
      <div class="content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style>
md-list div[slot='headline'] {
  font-weight: 900;
}
.content {
  background-color: var(--md-sys-color-surface-container-lowest);
  margin-block: 1rem;
  margin-inline-end: 1rem;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: rgba(99, 99, 99, 0.05) 0px 2px 8px 0px;
}
</style>
