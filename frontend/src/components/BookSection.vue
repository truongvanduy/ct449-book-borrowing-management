<script setup>
import BookList from '@/components/cards/BookList.vue'
defineProps({
  title: {
    type: String,
    default: ''
  },
  books: {
    type: Array,
    default: () => []
  }
})
</script>
<template>
  <section class="book-section flow">
    <h2 class="fs-2">{{ title }}</h2>
    <BookList
      :book="books"
      style="--flow-spacer: 1em"
    ></BookList>
  </section>
</template>
