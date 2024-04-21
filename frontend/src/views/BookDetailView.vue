<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import bookService from '@/services/book.service'
import ContentHeader from '@/components/ContentHeader.vue'
import { useSnackBarStore } from '@/stores/SnackBarStore'
import borrowService from '@/services/borrow.service'

const SERVER_BASE_URL = ref(import.meta.env.VITE_SERVER_BASE_URL)

const route = useRoute()
const router = useRouter()
const book = ref(() => ({}))

const regionNamesInVietnamese = new Intl.DisplayNames(['vi'], { type: 'language' })

onMounted(async () => {
  try {
    book.value = await bookService.get(route.params.id)
    if (!book.value.language) {
      book.value.language = 'en'
    }
  } catch (error) {
    console.log(error)
  }
})

async function handleOnBorrowClicked() {
  try {
    await borrowService.check(book.value._id)
    router.push({
      name: 'borrowing.create',
      props: {
        id: book.value.id
      }
    })
  } catch (error) {
    const snackbarStore = useSnackBarStore()
    snackbarStore.show({
      type: 'error',
      message: error.response.data.message || 'Có lỗi xảy ra'
    })
    if (error.response.status === 401) {
      router.push({
        name: 'sign-in-email'
      })
    }
  }
}
</script>
<template>
  <ContentHeader>Thông tin sách</ContentHeader>
  <div class="container flow">
    <div class="book-single-grid">
      <div class="book-single-img pr-4">
        <img
          :src="SERVER_BASE_URL + book.imageSource"
          alt=""
        />
      </div>
      <div
        class="book-single-summary flow"
        style="--flow-spacer: 0.5rem"
      >
        <h2 class="fs-4">{{ book.title }}</h2>
        <md-assist-chip :label="book.categories"></md-assist-chip>
        <md-filter-chip
          v-if="book.quantity > book.borrowed"
          class="ml-2"
          label="Có sẵn tại thư viện"
          selected
          @click.prevent="() => {}"
        ></md-filter-chip>
        <p
          v-if="book.authors"
          class="fs-6"
        >
          Tác giả: {{ book.authors }}
        </p>
        <p
          v-if="book.language"
          class="fs-6"
        >
          Ngôn ngữ: {{ regionNamesInVietnamese.of(book.language) }}
        </p>
        <p
          v-if="book.pageCount"
          class="fs-6"
        >
          Số trang: {{ book.pageCount }}
        </p>
        <p
          v-if="book.publisher"
          class="fs-6"
        >
          Nhà xuất bản: {{ book.publisher?.join('') }}
        </p>
        <p
          v-if="book.publishedDate"
          class="fs-6"
        >
          Ngày xuất bản: {{ book.publishedDate }}
        </p>

        <div>
          <md-filled-button
            v-if="book.quantity > book.borrowed"
            class="ml-auto mt-4"
            @click="handleOnBorrowClicked()"
            >Mượn sách</md-filled-button
          >
          <md-filled-button
            disabled
            v-else
            >Tạm hết</md-filled-button
          >
        </div>
      </div>
    </div>
    <p>{{ book.description }}</p>
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
