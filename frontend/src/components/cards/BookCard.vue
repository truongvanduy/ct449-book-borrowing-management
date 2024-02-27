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
      {{ item.volumeInfo.title }}
    </h4>
    <p class="book-authors">
      {{
        Array.isArray(item.volumeInfo.authors)
          ? item.volumeInfo.authors.join(', ')
          : item.volumeInfo.authors
      }}
    </p>
    <img
      :src="`/images/covers/${item.id}.jpg`"
      :srcset="item.volumeInfo?.imageLinks?.thumbnail"
      alt=""
    />
    <md-ripple></md-ripple>
  </div>
</template>

<style lang="scss" scoped></style>
