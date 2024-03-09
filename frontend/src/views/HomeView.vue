<script setup>
import BookSection from '@/components/BookSection.vue'
import { onMounted, ref } from 'vue'

const books = ref([])
const suggestedBooks = ref([])
const philosophyBooks = ref([])
const economicsBooks = ref([])
const maxBooksPerSection = 6

onMounted(async () => {
  const data = await fetch('http://localhost:3000/api/books')
  books.value = await data.json()

  suggestedBooks.value = books.value.slice(0, maxBooksPerSection)
  philosophyBooks.value = books.value
    .filter((book) => book.categories === 'Triết học')
    .slice(0, maxBooksPerSection)
  economicsBooks.value = books.value
    .filter((book) => book.categories === 'Kinh tế')
    .slice(0, maxBooksPerSection)
})
</script>

<template>
  <div
    class="flow"
    style="--flow-spacer: 2em"
  >
    <BookSection
      :title="'Gợi ý cho bạn'"
      :books="suggestedBooks"
    />
    <BookSection
      :title="'Triết học'"
      :books="philosophyBooks"
    />
    <BookSection
      :title="'Kinh tế'"
      :books="economicsBooks"
    />
  </div>
</template>

<style lang="scss" scoped></style>
