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
$maxImageWidth: 20rem;
$maxImageHeight: 20rem;
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

  &-card {
    position: relative;
    background-color: var(--md-sys-color-surface-container);

    padding: 1rem;
    border-radius: 1rem;

    display: grid;
    grid-row: span 3;
    gap: 0.25rem;
    grid-template-rows: subgrid;
    & img {
      width: min(100%, $maxImageWidth);
      max-height: $maxImageHeight;
      margin-top: auto;
      object-fit: contain;
    }
  }
  &-title,
  &-authors {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
