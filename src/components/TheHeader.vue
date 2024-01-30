<script setup>
import MenuButton from './navigation/MenuButton.vue'
</script>

<template>
  <header class="header">
    <!-- Logo -->
    <div class="logo">
      <MenuButton />
      <md-icon slot="icon">home</md-icon>
    </div>
    <!-- Search -->
    <div class="search">
      <md-outlined-text-field placeholder="Search for books">
        <md-icon-button slot="leading-icon">
          <md-icon>search</md-icon>
        </md-icon-button>
      </md-outlined-text-field>
    </div>
    <div class="user">
      <md-icon slot="icon">account_circle</md-icon>
    </div>
  </header>
</template>
