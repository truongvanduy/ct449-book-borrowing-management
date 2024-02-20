<script setup>
import { computed, ref } from 'vue'
import BookList from '@/components/cards/BookList.vue'
// import bookSource from '@/assets/json/philosophy.json'
import bookSource from '@/assets/json/bussiness_and_economics.json'
// import bookSource from '@/assets/json/computers.json'
import ThePagination from '@/components/ThePagination.vue'

const { items } = bookSource
const itemPerPage = ref(12)
const currentPage = ref(1)

const displayedItems = computed(() => {
  const start = (currentPage.value - 1) * itemPerPage.value
  const end = start + itemPerPage.value
  return items.slice(start, end)
})

const handlePageChange = (page) => {
  currentPage.value = page
}
</script>

<template>
  <h1 class="fs-1">Dashboard</h1>

  <ThePagination
    :itemCount="items.length"
    :itemPerPage="itemPerPage"
    @changePage="handlePageChange"
  >
    <BookList :book="displayedItems" />
  </ThePagination>
</template>
