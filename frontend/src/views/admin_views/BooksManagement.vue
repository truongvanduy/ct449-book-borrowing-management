<script setup>
import MdIconButton from '@/components/buttons/MdIconButton.vue'
import MdFloatingActionButton from '@/components/buttons/MdFloatingActionButton.vue'
import bookService from '@/services/book.service'
import { useSnackBarStore } from '@/stores/SnackBarStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const loading = ref(true)
const books = ref([])
const SERVER_BASE_URL = ref(import.meta.env.VITE_SERVER_BASE_URL)

onMounted(async () => {
  try {
    loading.value = true

    books.value = await bookService.getAll()
  } catch (error) {
    console.error(error)
    const snackbarStore = useSnackBarStore()
    snackbarStore.show({
      type: 'error',
      message: error.response.data.message || 'Có lỗi xảy ra'
    })
  }
  loading.value = false
})

const router = useRouter()
function showCreate() {
  router.push({ name: 'admin.books.create' })
}
</script>

<template>
  <md-linear-progress
    v-if="loading"
    indeterminate
  ></md-linear-progress>
  <div
    v-else
    class="container flow"
  >
    <h1 class="fs-2">Quản lý sách</h1>
    <table class="table table-solid">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên sách</th>
          <th>Số lượng</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(book, index) in books"
          :key="book._id"
        >
          <td class="text-center">{{ index + 1 }}</td>
          <td>
            <div class="book-row">
              <div class="book-img">
                <img
                  :src="SERVER_BASE_URL + book.imageSource"
                  alt=""
                />
              </div>
              <div class="book-content">
                <h6 class="fs-6">
                  {{ book.title }}
                </h6>
                <p>{{ book.authors }}</p>
              </div>
            </div>
          </td>
          <td class="text-center">{{ book.quantity }}</td>
          <td>
            <div class="book-row">
              <MdIconButton>edit</MdIconButton>
              <MdIconButton>delete</MdIconButton>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <MdFloatingActionButton
    :icon="'add'"
    :size="'large'"
    :label="'add'"
    :variant="'secondary'"
    @click="showCreate"
  ></MdFloatingActionButton>
</template>

<style lang="scss" scoped>
.book {
  &-row {
    display: flex;
    gap: 0.5rem;
  }
  &-img {
    width: 3rem;
    height: 4rem;
    flex-shrink: 0;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
