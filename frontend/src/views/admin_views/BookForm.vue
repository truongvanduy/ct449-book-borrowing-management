<script setup>
import ContentHeader from '@/components/ContentHeader.vue'
import bookAdminService from '@/services/book.admin.service'
import { useSnackBarStore } from '@/stores/SnackBarStore'
import getErrorMessage from '@/utils/getErrorMessage.util'
import { onMounted, ref } from 'vue'

// const SERVER_BASE_URL = ref(import.meta.env.VITE_SERVER_BASE_URL)

const authors = ref([])
const publishers = ref([])
const snackbarStore = useSnackBarStore()

const loading = ref(true)

onMounted(async () => {
  try {
    loading.value = true
    const result = await bookAdminService.create()
    authors.value = result?.authors
    publishers.value = result?.publishers
  } catch (error) {
    snackbarStore.show({
      type: 'error',
      message: error?.response?.data?.message || 'Có lỗi xảy ra'
    })
  }
  loading.value = false
})
const form = ref(null)
const title = ref('')
const author = ref('')
const publisher = ref('')
const publishedDate = ref('')
const quantity = ref(0)
const pageCount = ref(0)
const language = ref('')
const description = ref('')
const image = ref(null)

async function handleSubmit() {
  const data = {
    title: title.value,
    author: author.value,
    publisher: publisher.value,
    publishedDate: publishedDate.value,
    quantity: quantity.value,
    pageCount: pageCount.value,
    language: language.value,
    description: description.value,
    image: image.value.files[0]
  }
  const formData = new FormData()
  const { elements } = form.value
  console.log(elements.title)
  formData.set('title', data.title)
  formData.set('author', data.author)
  formData.set('publisher', data.publisher)
  formData.set('publishedDate', data.publishedDate)
  formData.set('quantity', data.quantity)
  formData.set('pageCount', data.pageCount)
  formData.set('language', data.language)
  formData.set('description', data.description)
  formData.set('image', data.image)
  console.log(formData.values())
  try {
    const response = await bookAdminService.store(formData)
  } catch (error) {
    snackbarStore.show({
      type: 'error',
      message: getErrorMessage(error)
    })
  }
}
</script>

<template>
  <md-linear-progress
    indeterminate
    v-if="loading"
  ></md-linear-progress>
  <template v-else>
    <ContentHeader></ContentHeader>
    <div
      class="container"
      style="--container-width: 30rem"
    >
      <h2 class="fs-2 mb-4">Thêm sách mới</h2>

      <!-- Form -->
      <form
        @submit.prevent="handleSubmit"
        ref="form"
        class="form flow"
      >
        <!-- Title -->
        <div class="form-control">
          <md-outlined-text-field
            id="title"
            label="Tựa sách"
            name="title"
            class="form-text-field"
            v-model="title"
          />
        </div>

        <!-- Author -->
        <div class="form-control">
          <md-outlined-select
            class="form-dropdown"
            name="author"
            v-model="author"
          >
            <md-select-option
              aria-label="blank"
              selected
            >
              <div slot="headline">Chọn tác giả</div>
            </md-select-option>
            <template v-if="authors.length > 0">
              <md-select-option
                v-for="author in authors"
                :key="author._id"
                :value="author._id"
              >
                <div slot="headline">{{ author.name }}</div>
              </md-select-option>
            </template>
          </md-outlined-select>
        </div>

        <!-- Publish -->
        <div class="form-control">
          <!-- Publisher dropdown -->
          <md-outlined-select
            class="form-dropdown"
            name="publisher"
            v-model="publisher"
          >
            <md-select-option
              aria-label="blank"
              selected
            >
              <div slot="headline">Chọn nhà xuất bản</div>
            </md-select-option>
            <template v-if="publishers.length > 0">
              <md-select-option
                v-for="publisher in publishers"
                :key="publisher._id"
                :value="publisher._id"
              >
                <div slot="headline">{{ publisher.name }}</div>
              </md-select-option>
            </template>
          </md-outlined-select>

          <!-- Publish date -->
          <md-outlined-text-field
            type="date"
            label="Ngày xuất bản"
            class="form-date"
            name="publishedDate"
            v-model="publishedDate"
          />
        </div>

        <!-- Quantity, Page Count, Language -->
        <div class="form-control">
          <!-- Quantity -->
          <md-outlined-text-field
            type="number"
            name="quantity"
            label="Số lượng"
            suffix-text="quyển"
            v-model="quantity"
          >
            <!-- Page count -->
          </md-outlined-text-field>
          <md-outlined-text-field
            type="number"
            name="pageCount"
            label="Số trang"
            suffix-text="trang"
            v-model="pageCount"
          >
          </md-outlined-text-field>

          <!-- Language -->
          <md-outlined-select
            class="form-dropdown"
            name="language"
            v-model="language"
          >
            <md-select-option
              aria-label="blank"
              selected
            >
              <div slot="headline">Chọn ngôn ngữ</div>
            </md-select-option>
            <md-select-option value="en">
              <div slot="headline">Tiếng Anh</div>
            </md-select-option>
            <md-select-option value="vi">
              <div slot="headline">Tiếng Việt</div>
            </md-select-option>
          </md-outlined-select>
        </div>

        <!-- Description -->
        <div class="form-control">
          <md-outlined-text-field
            type="textarea"
            name="description"
            label="Mô tả"
            class="form-textarea"
            rows="5"
            value=""
            v-model="description"
          ></md-outlined-text-field>
        </div>

        <!-- Image -->
        <div class="form-control">
          <input
            ref="image"
            accept="image/*"
            type="file"
            name="image"
            id="image"
            class="form-image"
          />
        </div>

        <!-- Submit button -->
        <md-filled-button type="submit"> Thêm </md-filled-button>
      </form>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.form {
  &-control {
    display: flex;
    width: 100%;
    gap: 1rem;
  }
  &-text-field {
    width: 100%;
  }
  &-dropdown,
  &-textarea {
    width: 100%;
  }
  &-date {
    margin-left: auto;
    width: min(100%, 15ch);
  }
  &-image {
    padding: 1rem;
    border: 1px solid #999;
    border-radius: 4px;
    width: 100%;
    font-size: 1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
}
</style>
