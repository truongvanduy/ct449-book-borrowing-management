<script setup>
import MdIcon from '../MdIcon.vue'
defineProps({
  style: {
    type: String,
    default: 'outlined'
  }
})
</script>
<template>
  <md-icon-button>
    <MdIcon :style="style">
      <slot></slot>
    </MdIcon>
  </md-icon-button>
</template>
