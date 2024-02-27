<script setup>
import { computed, ref } from 'vue'

const { itemPerPage, itemCount } = defineProps({
  itemPerPage: {
    type: Number,
    default: 10
  },
  itemCount: {
    type: Number,
    default: 100
  }
})

const emit = defineEmits(['changePage'])

const currentPage = ref(1)

const pageCount = computed(() => Math.ceil(itemCount / itemPerPage))
let pages = computed(() => Array.from({ length: pageCount.value }, (_, i) => i + 1))

const handlePageBtnClick = (page) => {
  currentPage.value = page
  emit('changePage', page)
}
</script>
<template>
  <slot></slot>
  <div
    class="pagination"
    v-if="itemCount && itemPerPage"
  >
    <template
      v-for="page in pages"
      :key="page"
    >
      <md-icon-button
        v-if="page !== currentPage"
        toggle
        class="pagination-btn"
        :selected="page === currentPage ? 'selected' : undefined"
        @click="handlePageBtnClick(page)"
        >{{ page }}
      </md-icon-button>

      <md-filled-icon-button
        v-else
        toggle
        class="pagination-btn"
        :selected="page === currentPage ? 'selected' : undefined"
        @click="handlePageBtnClick(page)"
        >{{ page }}
      </md-filled-icon-button>
    </template>
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
