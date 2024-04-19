<script setup>
import { onMounted, ref } from 'vue'
import bookService from '@/services/book.service'
import ContentHeader from '@/components/ContentHeader.vue'
import borrowService from '@/services/borrow.service'
import { useRouter } from 'vue-router'
const { id } = defineProps({
  id: {
    type: String,
    require: true
  }
})

const router = useRouter()
const book = ref(() => ({}))
const borrowing = ref(() => {})

onMounted(async () => {
  try {
    book.value = await bookService.get(id)
    borrowing.value = await borrowService.create(id)
    console.log(borrowing.value)
  } catch (error) {
    console.log(error)
    throw error
  }
})

async function handleOnBorrowClicked() {
  try {
    const response = await borrowService.register(id)
    if (response.status === 'ok') {
      router.push({ name: 'borrowings' })
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <ContentHeader>Xác nhận mượn sách</ContentHeader>
  <div class="container flow">
    <div class="book-single-grid">
      <div class="book-single-img pr-4">
        <img
          :src="book.imageSource"
          alt=""
        />
      </div>
      <div
        class="book-single-summary flow"
        style="--flow-spacer: 0.5rem"
      >
        <h2 class="fs-4">{{ book.title }}</h2>
        <p class="fs-6">Ngày đăng ký: {{ borrowing?.registered_at?.split('T')[0] }}</p>
        <p class="fs-6">Lấy sách trước ngày: {{ borrowing?.pickup_at?.split('T')[0] }}</p>
        <p class="fs-6">Trả sách trước ngày: {{ borrowing?.return_at?.split('T')[0] }}</p>

        <div>
          <md-filled-button
            class="ml-auto mt-4"
            @click="handleOnBorrowClicked()"
            >Mượn sách</md-filled-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.book-single {
  &-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 2rem;
  }
  &-img {
    max-width: 20rem;
  }
}
.chip md-icon {
  font-size: 1.125rem;
}
</style>
