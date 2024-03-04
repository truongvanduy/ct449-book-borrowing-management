<script setup>
defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})
</script>
<template>
  <div class="book-card">
    <h4 class="book-title fs-6">
      {{ item.title }}
    </h4>
    <p class="book-authors">
      {{ item.authorsName }}
      <!-- {{ Array.isArray(item.authorsName) ? item.authorsName.join(', ') : item.authorsName }} -->
    </p>
    <img
      :src="`/images/covers/${item.id}.jpg`"
      :srcset="item?.imageLinks"
      alt=""
    />
    <md-ripple></md-ripple>
  </div>
</template>

<style lang="scss" scoped></style>
