<script setup>
import { MdSecondaryTab } from '@material/web/all'
import { ref } from 'vue'

const tab = new MdSecondaryTab()
const tabs = ref(tab)
</script>

<template>
  <h1>UserManagement</h1>
  <md-filled-card>hi</md-filled-card>
  {{ tabs }}
</template>
