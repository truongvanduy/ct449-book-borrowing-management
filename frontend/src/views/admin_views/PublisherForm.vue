<script setup>
import ContentHeader from '@/components/ContentHeader.vue'
import publisherAdminService from '@/services/publisher.admin.service'
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

// Load data
const existingPublisher = ref(null)
const snackbarStore = useSnackBarStore()

const loading = ref(true)
const router = useRouter()

const form = ref(null)
const name = ref()
const address = ref()

onMounted(async () => {
  try {
    loading.value = true

    if (id === '') {
      await publisherAdminService.create()
    } else {
      // Display existing publisher
      const response = await publisherAdminService.get(id)
      existingPublisher.value = response.publisher

      name.value = existingPublisher.value?.name || ''
      address.value = existingPublisher.value?.address || ''
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
async function handleSubmit() {
  const formData = new FormData()
  if (id) {
    formData.set('_id', id)
  }
  formData.set('name', name.value)
  formData.set('address', address.value)
  try {
    loading.value = true

    let response = ''
    if (!id) {
      response = await publisherAdminService.store(formData)
    } else {
      response = await publisherAdminService.update(formData)
    }
    router.push({ name: 'admin.publishers' })
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
      <h2 class="fs-2 mb-4">{{ id ? 'Cập nhật nhà xuất bản' : 'Thêm nhà xuất bản mới' }}</h2>

      <!-- Form -->
      <form
        @submit.prevent="handleSubmit"
        ref="form"
        class="form flow"
      >
        <!-- Name -->
        <div class="form-control">
          <md-outlined-text-field
            id="name"
            label="Tên nhà xuất bản"
            name="name"
            class="form-text-field"
            v-model="name"
          />
        </div>
        <!-- Name -->
        <div class="form-control">
          <md-outlined-text-field
            id="address"
            label="Địa chỉ"
            name="address"
            class="form-text-field"
            v-model="address"
          />
        </div>

        <!-- Submit button -->
        <md-filled-button
          class="ml-auto"
          type="submit"
        >
          Thêm
        </md-filled-button>
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
