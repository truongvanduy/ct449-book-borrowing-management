<script setup>
import { computed, ref, watchEffect } from 'vue'
import BookList from '@/components/cards/BookList.vue'
import ThePagination from '@/components/ThePagination.vue'
import bookService from '@/services/book.service'
import { useRoute } from 'vue-router'

// Search values
const route = useRoute()

// let items = bookSource
const items = ref([])
const itemPerPage = ref(12)
const currentPage = ref(1)

const displayedItems = computed(() => {
  const start = (currentPage.value - 1) * itemPerPage.value
  const end = start + itemPerPage.value
  return items.value.slice(start, end)
})

const handlePageChange = (page) => {
  currentPage.value = page
}

// Display book cards

const loading = ref(true)

watchEffect(async () => {
  const filter = route.query || {}

  loading.value = true

  const response = await bookService.getAll(filter)
  items.value = response

  loading.value = false
})
</script>

<template>
  <h1 class="fs-2">Thư viện</h1>
  <md-linear-progress
    v-if="loading"
    class="auth-progress"
    indeterminate
  ></md-linear-progress>
  <ThePagination
    v-if="items.length"
    :itemCount="items.length"
    :itemPerPage="itemPerPage"
    @changePage="handlePageChange"
  >
    <BookList :book="displayedItems" />
  </ThePagination>
</template>
