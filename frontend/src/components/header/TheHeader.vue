<script setup>
import SearchBar from './SearchBar.vue'
import NavigationButton from '../navigation/NavigationButton.vue'
import ThemePicker from './ThemePicker.vue'
import UserMenu from './UserMenu.vue'
import LogoWithoutText from '../logos/LogoWithoutText.vue'
import LogoWithText from '../logos/LogoWithText.vue'
</script>

<template>
  <header class="header">
    <!-- Start -->
    <div class="header-start">
      <NavigationButton
        class="toggle-menu"
        type="toggleMenu"
      />
      <NavigationButton
        class="toggle-expand"
        type="toggleExpand"
      />
      <!-- Logo -->
      <div class="logo">
        <router-link to="/">
          <div class="logo">
            <LogoWithText />
          </div>
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
