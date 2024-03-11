<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import bookService from '@/services/book.service'
import ContentHeader from '@/components/ContentHeader.vue'
import { useSignInDialogStore } from '@/stores/SignInDialogStore'

const route = useRoute()
const book = ref(() => ({}))

const regionNamesInVietnamese = new Intl.DisplayNames(['vi'], { type: 'language' })

onMounted(async () => {
  book.value = await bookService.get(route.params.id)
  if (!book.value.language) {
    book.value.language = 'en'
  }
})

// Sign in to borrow a book
const signInDialog = useSignInDialogStore()
function showDialog() {
  signInDialog.open()
}
</script>
<template>
  <ContentHeader>Thông tin sách</ContentHeader>
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
        <md-assist-chip :label="book.categories"></md-assist-chip>
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
            class="ml-auto mt-4"
            @click="showDialog()"
            >Mượn sách</md-filled-button
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
</style>
../services/book.service
