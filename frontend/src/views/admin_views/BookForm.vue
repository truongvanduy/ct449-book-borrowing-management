<script setup>
import ContentHeader from '@/components/ContentHeader.vue'
import bookAdminService from '@/services/book.admin.service'
import bookService from '@/services/book.service'
import { useSnackBarStore } from '@/stores/SnackBarStore'
import getErrorMessage from '@/utils/getErrorMessage.util'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const { id } = defineProps({
  id: {
    type: String,
    default: ''
  }
})

const SERVER_BASE_URL = ref(import.meta.env.VITE_SERVER_BASE_URL)

// Load data
const authors = ref([])
const publishers = ref([])
const categories = ref([])
const existingBook = ref(null)
const snackbarStore = useSnackBarStore()

const loading = ref(true)
const router = useRouter()

onMounted(async () => {
  try {
    loading.value = true
    const result = await bookAdminService.create()
    categories.value = result?.categories
    authors.value = result?.authors
    publishers.value = result?.publishers

    // Display existing book
    if (id !== '') {
      existingBook.value = await bookService.get(id)

      title.value = existingBook.value?.title || ''
      // Assign init value with the existing author id
      author.value = authors.value.find((author) => existingBook.value?.authors === author.name)._id
      // Assign init value with the existing catgory id
      category.value = categories.value.find(
        (category) => existingBook.value?.categories === category.name
      )._id
      // Assign init value with the existing publisher id
      publisher.value = publishers.value.find(
        (publisher) => existingBook.value?.publisher === publisher.name
      )._id
      language.value = existingBook.value?.language
      publishedDate.value = existingBook.value?.publishedDate || ''
      quantity.value = existingBook.value?.quantity || ''
      pageCount.value = existingBook.value?.pageCount || ''
      description.value = existingBook.value?.description || ''
      previewUrl.value = `${SERVER_BASE_URL.value}${existingBook.value?.imageSource}`
      image.value = existingBook.value?.image || ''
    }
  } catch (error) {
    snackbarStore.show({
      type: 'error',
      message: error?.response?.data?.message || 'Có lỗi xảy ra'
    })
    router.go(-1)
  }
  loading.value = false
})

// Handle input
const form = ref(null)
const title = ref('')
const author = ref()
const category = ref('')
const publisher = ref('')
const publishedDate = ref('')
const quantity = ref('')
const pageCount = ref('')
const language = ref()
const description = ref('')
const image = ref(null)
const previewUrl = ref('')

// Preview image
function handleImageChange(e) {
  const file = e?.target?.files[0]
  previewUrl.value = URL.createObjectURL(file)
}

async function handleSubmit() {
  const formData = new FormData()
  formData.set('_id', id)
  formData.set('title', title.value)
  formData.set('author', author.value)
  formData.set('category', category.value)
  formData.set('publisher', publisher.value)
  formData.set('publishedDate', publishedDate.value)
  formData.set('quantity', quantity.value)
  formData.set('pageCount', pageCount.value)
  formData.set('language', language.value)
  formData.set('description', description.value)
  formData.set('image', image.value.files[0])
  try {
    loading.value = true

    let response = ''
    if (!id) {
      response = await bookAdminService.store(formData)
    } else {
      response = await bookAdminService.update(formData)
    }
    router.push({ name: 'admin.books' })
    snackbarStore.show({
      type: 'success',
      message: response?.message || 'Thêm sách thành công'
    })
  } catch (error) {
    snackbarStore.show({
      type: 'error',
      message: getErrorMessage(error)
    })
  }
  loading.value = false
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
      <h2 class="fs-2 mb-4">{{ id ? 'Cập nhật sách' : 'Thêm sách mới' }}</h2>

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
              :selected="!id"
            >
              <div slot="headline">Chọn tác giả</div>
            </md-select-option>
            <template v-if="authors.length > 0">
              <md-select-option
                v-for="author in authors"
                :key="author._id"
                :value="author._id"
                :selected="existingBook && author.name === existingBook.authors"
              >
                <div slot="headline">{{ author.name }}</div>
              </md-select-option>
            </template>
          </md-outlined-select>
        </div>
        <!-- Category -->
        <md-outlined-select
          class="form-dropdown"
          name="category"
          v-model="category"
        >
          <md-select-option
            aria-label="blank"
            :selected="!id"
          >
            <div slot="headline">Chọn thể loại</div>
          </md-select-option>
          <template v-if="categories.length > 0">
            <md-select-option
              v-for="category in categories"
              :key="category._id"
              :value="category._id"
              :selected="existingBook && category.name === existingBook.categories"
            >
              <div slot="headline">{{ category.name }}</div>
            </md-select-option>
          </template>
        </md-outlined-select>

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
              :selected="!id"
            >
              <div slot="headline">Chọn nhà xuất bản</div>
            </md-select-option>
            <template v-if="publishers.length > 0">
              <md-select-option
                v-for="publisher in publishers"
                :key="publisher._id"
                :value="publisher._id"
                :selected="existingBook && publisher.name === existingBook.publisher"
              >
                <div slot="headline">
                  {{ publisher.name }}
                </div>
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
              :selected="!id"
            >
              <div slot="headline">Chọn ngôn ngữ</div>
            </md-select-option>
            <md-select-option
              value="en"
              :selected="existingBook && existingBook.language === 'en'"
            >
              <div slot="headline">Tiếng Anh</div>
            </md-select-option>
            <md-select-option
              value="vi"
              :selected="existingBook && existingBook.language === 'vi'"
            >
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
          <div class="form-preview">
            <img
              :src="previewUrl"
              alt=""
            />
          </div>
          <input
            ref="image"
            accept="image/*"
            type="file"
            name="image"
            id="image"
            class="form-image"
            @change="handleImageChange"
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
  &-preview {
    height: 58px;
    width: 50px;
    border: 1px solid #888;
    border-radius: 4px;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-image {
    padding: 1rem;
    border: 1px solid #888;
    border-radius: 4px;
    width: 100%;
    font-size: 1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
}
</style>
