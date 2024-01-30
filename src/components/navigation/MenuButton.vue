<template>
  <md-icon-button @click="menuStore.toggleMenu">
    <md-icon>menu</md-icon>
  </md-icon-button>
</template>

<script setup>
import { useMenuStore } from '@/stores/MenuStore'

const menuStore = useMenuStore()
</script>

<style lang="scss" scoped></style>
