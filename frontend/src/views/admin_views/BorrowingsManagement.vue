<script setup>
import borrowAdminService from '@/services/borrow.admin.service'
import { translateBorrowingStatus } from '@/utils/translator.util'
import { getDateString } from '@/utils/date.util'
import { useSnackBarStore } from '@/stores/SnackBarStore'
import { onMounted, ref } from 'vue'

const borrowings = ref([])
const loading = ref(true)
const snackbarStore = useSnackBarStore()

onMounted(async () => {
  try {
    loading.value = true
    borrowings.value = await borrowAdminService.getAll()
  } catch (error) {
    console.log(error)
    const snackbarStore = useSnackBarStore()
    snackbarStore.show({
      type: 'error',
      message: error?.response?.data?.message || 'Có lỗi xảy ra'
    })
  }
  loading.value = false
})

async function approve(id, index) {
  try {
    await borrowAdminService.approve(id)
    borrowings.value[index].status = 'approved'
    snackbarStore.show({
      type: 'success',
      message: 'Duyệt phiếu mượn thành công'
    })
  } catch (error) {
    console.log(error)
    snackbarStore.show({
      type: 'error',
      message: error?.response?.data?.message || 'Có lỗi xảy ra'
    })
  }
}

async function reject(id, index) {
  try {
    await borrowAdminService.reject(id)
    borrowings.value[index].status = 'rejected'
    snackbarStore.show({
      type: 'success',
      message: 'Từ chối phiếu mượn thành công'
    })
  } catch (error) {
    console.log(error)
    snackbarStore.show({
      type: 'error',
      message: error?.response?.data?.message || 'Có lỗi xảy ra'
    })
  }
}
</script>

<template>
  <md-linear-progress
    v-if="loading"
    indeterminate
  ></md-linear-progress>
  <div
    v-else
    class="container"
    style="--container-width: 100rem"
  >
    <table class="table table-solid text-center mx-auto">
      <thead>
        <tr>
          <th>Người dùng</th>
          <th>Tên sách</th>
          <th>Ngày ĐK</th>
          <th>Hạn trả</th>
          <th>Trạng thái</th>
          <!-- <th></th> -->
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(borrowing, index) in borrowings"
          :key="borrowing._id"
        >
          <td>{{ borrowing.userId }}</td>
          <td class="text-start">
            {{ borrowing.book.title }}
          </td>
          <td class="table-date">{{ getDateString(borrowing.registered_at) }}</td>
          <td class="table-date">{{ getDateString(borrowing.return_at) }}</td>
          <td>
            <div class="table-status text-center">
              <span class="table-status-text">
                {{ translateBorrowingStatus(borrowing.status) }}
              </span>
              <div
                v-if="borrowing.status === 'registered'"
                class="table-actions"
              >
                <md-text-button @click="() => reject(borrowing._id, index)">Từ chối</md-text-button>
                <md-filter-chip
                  class="ml-2"
                  label="Duyệt"
                  selected
                  @click.prevent="() => approve(borrowing._id, index)"
                ></md-filter-chip>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
.table {
  &-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    &-text {
      flex: 1;
    }
  }
  &-actions {
    display: flex;
    align-items: center;
  }
  & md-text-button {
    --md-text-button-label-text-color: var(--md-sys-color-error);

    --md-text-button-hover-label-text-color: var(--md-sys-color-error);
    --md-text-button-hover-state-layer-color: var(--md-sys-color-error-container);

    --md-text-button-focus-label-text-color: var(--md-sys-color-error);

    --md-text-button-pressed-label-text-color: var(--md-sys-color-error);
    --md-text-button-pressed-state-layer-color: var(--md-sys-color-error-container);
  }
  &-date {
    text-wrap: nowrap;
  }
}
</style>
