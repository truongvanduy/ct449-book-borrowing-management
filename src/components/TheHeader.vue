<script setup>
import SearchBar from './SearchBar.vue'
import MenuButton from './navigation/MenuButton.vue'
</script>

<template>
  <header class="header">
    <div class="header-start">
      <MenuButton
        class="toggle-menu"
        type="toggleMenu"
      />
      <MenuButton
        class="toggle-expand"
        type="toggleExpand"
      />
      <!-- Logo -->
      <div class="logo">
        <router-link to="/">
          <md-icon-button>
            <md-icon class="material-symbols-rounded">home</md-icon>
          </md-icon-button>
        </router-link>
      </div>
    </div>
    <!-- Search -->
    <SearchBar />
    <div class="user">
      <md-icon slot="icon">account_circle</md-icon>
    </div>
  </header>
</template>
