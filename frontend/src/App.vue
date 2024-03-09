<script setup>
import TheNavigation from './components/navigation/TheNavigation.vue'
import TheHeader from './components/header/TheHeader.vue'
import { useThemeStore } from './stores/ThemeStore'
import { storeToRefs } from 'pinia'
import SignInDialog from '@/components/SignInDialog.vue'
import { onMounted, ref } from 'vue'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const dialog = ref(null)

onMounted(() => {
  dialog.value.$el.show()
})
</script>

<template>
  <div
    class="wrapper"
    :class="theme"
  >
    <TheHeader />
    <main class="main">
      <TheNavigation />
      <!-- <TheContent /> -->
      <div class="pane">
        <div class="scroll-wrapper">
          <div class="content flow">
            <router-view />
          </div>
        </div>
      </div>
    </main>
  </div>
  <SignInDialog ref="dialog" />
</template>

<style>
md-list div[slot='headline'] {
  font-weight: 900;
}
</style>
