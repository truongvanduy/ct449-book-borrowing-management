<script setup>
import MdIcon from './MdIcon.vue'
import SearchBar from './SearchBar.vue'
import MenuButton from './navigation/MenuButton.vue'
import MdIconButton from './buttons/MdIconButton.vue'
import ThemePicker from './ThemePicker.vue'
import UserMenu from './UserMenu.vue'
</script>

<template>
  <header class="header">
    <!-- Start -->
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
    <!-- End -->
    <div class="header-end">
      <UserMenu />
      <ThemePicker />
    </div>
  </header>
</template>
