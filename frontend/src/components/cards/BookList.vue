<script setup>
import BookCard from './BookCard.vue'

defineProps({
  book: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <!-- <template> -->
  <div class="book-container">
    <div class="book-grid">
      <BookCard
        v-for="item in book"
        :key="item.id"
        :item="item"
      >
      </BookCard>
    </div>
  </div>
</template>

<style lang="scss">
$maxColumnCount: 6;
$minColumnSize: 12.5rem;
$breakpoint: calc(
  $minColumnSize * $maxColumnCount + 1rem * ($maxColumnCount - 1) + 22.25rem
); // 22.25rem is the width of the rest
.book {
  &-container {
    container-type: inline-size;
  }
  &-grid {
    display: grid;
    margin-left: auto;
    margin-right: auto;
    grid-template-columns: repeat(auto-fill, minmax($minColumnSize, 1fr));
    gap: 1rem;

    @media (min-width: $breakpoint) {
      grid-template-columns: repeat($maxColumnCount, minmax($minColumnSize, 1fr));
    }
  }
}
</style>
