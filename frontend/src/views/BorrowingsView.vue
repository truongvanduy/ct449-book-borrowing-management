<script setup>
import { onMounted, ref } from 'vue'
import borrowService from '@/services/borrow.service'

// let items = bookSource
const borrowings = ref([])

onMounted(async () => {
  try {
    borrowings.value = await borrowService.getAll()
    console.log(borrowings.value)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <h1 class="fs-2">Sách đang mượn</h1>
  <ul>
    <li
      v-for="item in borrowings"
      :key="item._id"
    >
      <p>bookId: {{ item.bookId }}</p>
      <p>Đăng ký vào: {{ item.registered_at }}</p>
      <p>Hạn lấy: {{ item.pickup_at }}</p>
      <p>Hạn trả: {{ item.return_at }}</p>
    </li>
  </ul>
</template>
