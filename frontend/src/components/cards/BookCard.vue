<script setup>
import { useRouter } from 'vue-router'

defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})

const router = useRouter()
</script>
<template>
  <div
    class="book-card"
    @click="router.push(`/books/${item._id}`)"
  >
    <h4 class="book-title fs-6">
      {{ item.title }}
    </h4>
    <p class="book-authors">
      {{ item.authors }}
    </p>
    <div class="book-img">
      <span class="book-category">{{ item.categories }}</span>
      <img
        :src="`/images/covers/${item.id}.jpg`"
        :srcset="item?.imageSource"
        alt=""
      />
    </div>
    <md-ripple></md-ripple>
  </div>
</template>

<style lang="scss">
.book {
  &-card {
    position: relative;
    background-color: var(--md-sys-color-surface-container);

    padding: 1rem;
    border-radius: 1rem;

    display: grid;
    grid-row: span 3;
    gap: 0.25rem;
    grid-template-rows: subgrid;
  }
  &-img {
    margin-top: auto;
    position: relative;
    & img {
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
  &-category {
    position: absolute;
    top: 0;
    right: 0;

    text-align: center;
    font-size: 0.9rem;

    width: max-content;
    padding: 0.25rem 0.5rem;
    border-bottom-left-radius: 0.5rem;
    background-color: var(--md-sys-color-surface-container-highest);
  }
}
</style>
