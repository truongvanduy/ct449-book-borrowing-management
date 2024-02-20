<script setup>
import { computed } from 'vue'

const { itemPerPage, itemCount } = defineProps({
  itemPerPage: {
    type: Number,
    default: 10
  },
  itemCount: {
    type: Number,
    default: 100
  },
  currentPage: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['changePage'])

const pageCount = computed(() => Math.ceil(itemCount / itemPerPage))
let pages = computed(() => Array.from({ length: pageCount.value }, (_, i) => i + 1))

const handlePageBtnClick = (page) => {
  console.log(page)
  emit('changePage', page)
}
</script>
<template>
  <slot></slot>
  <div
    class="pagination"
    v-if="itemCount && itemPerPage"
  >
    <md-text-button
      class="pagination-btn"
      :class="{ active: page === currentPage }"
      v-for="page in pages"
      :selected="page === currentPage ? 'selected' : undefined"
      :key="page"
      @click="handlePageBtnClick(page)"
      >{{ page }}
    </md-text-button>
  </div>
  <p v-else>loading</p>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding-block: 1rem;
}
</style>
