<script setup>
import { onMounted, ref } from 'vue'
import borrowService from '@/services/borrow.service'
import { useSnackBarStore } from '@/stores/SnackBarStore'
import { useRouter } from 'vue-router'

const SERVER_BASE_URL = ref(import.meta.env.VITE_SERVER_BASE_URL)

// let items = bookSource
const borrowings = ref([])
const statusTranslations = ref({
  registered: 'Đang chờ duyệt',
  accepted: 'Đã được duyệt',
  taken: 'Đã nhận sách',
  returned: 'Đã trả sách'
})

const router = useRouter()
onMounted(async () => {
  try {
    borrowings.value = await borrowService.getAll()
    console.log(borrowings.value)
  } catch (error) {
    console.log(error)
    const snackbarStore = useSnackBarStore()
    snackbarStore.show({
      type: 'error',
      message: error.response.data.message || 'Có lỗi xảy ra'
    })
    if (error.response.status === 401) {
      router.push({ name: 'sign-in-email' })
    }
  }
})
</script>

<template>
  <h1 class="fs-2">Sách đang mượn</h1>
  <ul
    v-if="borrowings"
    class="borrow-list flow"
  >
    <li
      v-for="item in borrowings"
      :key="item._id"
    >
      <div class="borrow-card">
        <header class="borrow-header mb-3">
          <h3 class="fs-6 text-italic">#{{ item._id }}</h3>
          <md-suggestion-chip :label="statusTranslations[item.status]"></md-suggestion-chip>
        </header>
        <div class="borrow-body">
          <div class="borrow-img">
            <img
              :src="SERVER_BASE_URL + item?.book?.imageSource"
              alt=""
            />
          </div>
          <div class="borrow-info">
            <h4 class="h4 fs-4">{{ item?.book?.title }}</h4>
            <p>Đăng ký mượn vào: {{ item.registered_at }}</p>
            <!-- <p>Hạn lấy: {{ item.pickup_at }}</p> -->
            <p>Hạn trả: {{ item.return_at }}</p>
          </div>
        </div>
        <!-- <md-ripple></md-ripple> -->
      </div>
    </li>
  </ul>
</template>

<style lang="scss">
.borrow {
  &-card {
    position: relative;

    width: min(100%, 40rem);
    margin-left: auto;
    margin-right: auto;

    padding: 1.5rem;
    background-color: var(--md-sys-color-surface-container);
    border-radius: var(--catalog-shape-xl);
  }
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-body {
    display: flex;
    gap: 1.5rem;
  }
  &-img {
    max-height: 15rem;
    flex: 1;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-info {
    flex: 3;
  }
}
</style>
