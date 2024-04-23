<script setup>
import MdIconButton from '@/components/buttons/MdIconButton.vue'
import MdFloatingActionButton from '@/components/buttons/MdFloatingActionButton.vue'
import { useSnackBarStore } from '@/stores/SnackBarStore'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import MdIcon from '@/components/icons/MdIcon.vue'
import publisherAdminService from '@/services/publisher.admin.service'
import getErrorMessage from '@/utils/getErrorMessage.util'
import SearchBar from '@/components/SearchBar.vue'

// Init state
const loading = ref(true)
const publishers = ref([])
const snackbarStore = useSnackBarStore()

onMounted(async () => {
  try {
    loading.value = true

    publishers.value = await publisherAdminService.getAll()
  } catch (error) {
    console.error(error)
    snackbarStore.show({
      type: 'error',
      message: error.response.data.message || 'Có lỗi xảy ra'
    })
  }
  loading.value = false
})

// Hanlde search
const searchText = ref('')

async function updatePublisherList() {
  try {
    loading.value = true

    publishers.value = await publisherAdminService.getAll({ q: searchText.value })
  } catch (error) {
    snackbarStore.show({
      type: 'error',
      message: error.response.data.message || 'Có lỗi xảy ra'
    })
  }
  loading.value = false
}

// Handle actions
const router = useRouter()
function showCreate() {
  router.push({ name: 'admin.publishers.create' })
}

function handleEditClick(id) {
  router.push({ name: 'admin.publishers.edit', params: { id } })
}

const dialogOpen = ref(false)
const publisherId = ref(null)
function openDialog(id) {
  dialogOpen.value = true
  publisherId.value = id
}
function closeDialog() {
  dialogOpen.value = false
}

// Trigger reload content on successful deletetion
const reload = ref(false)

async function handleDeleteClick() {
  dialogOpen.value = false

  try {
    loading.value = true
    const response = await publisherAdminService.delete(publisherId.value)
    reload.value = true
    snackbarStore.show({
      type: 'success',
      message: response?.message || 'Xoá sách thành công'
    })
  } catch (error) {
    console.log(error)
    snackbarStore.show({
      type: 'error',
      message: getErrorMessage(error)
    })
  }
  loading.value = false
}

watch(reload, async () => {
  await updatePublisherList()
  reload.value = false
})
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
    <h1 class="fs-2">Quản lý nhà xuất bản</h1>

    <!-- Search -->
    <SearchBar
      class="ml-auto"
      v-model="searchText"
      @submit="() => updatePublisherList()"
    ></SearchBar>

    <!-- Result table -->
    <table
      v-if="publishers.length > 0"
      class="table table-solid table-publisher"
    >
      <thead>
        <tr>
          <th>STT</th>
          <th>Nhà xuất bản</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(publisher, index) in publishers"
          :key="publisher._id"
        >
          <td class="text-center">{{ index + 1 }}</td>
          <td>
            <h6 class="fs-6">
              {{ publisher.name }}
            </h6>
            <p>
              {{
                publisher.address || '  Lorem ipsum dolor sit amet consectetur adipisicing elit.'
              }}
            </p>
          </td>
          <td>
            <div class="publisher-row">
              <MdIconButton @click="() => handleEditClick(publisher._id)">edit</MdIconButton>
              <MdIconButton @click="() => openDialog(publisher._id)">delete</MdIconButton>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- No result -->
    <div
      v-else
      class="fs5"
    >
      Không tìm thấy sách. Vui lòng thử lại với từ khóa khác.
    </div>
  </div>

  <!-- Confirm Dialog -->
  <md-dialog
    style="max-width: 320px"
    :open="dialogOpen"
  >
    <div slot="headline">Xóa nhà xuất bản</div>
    <MdIcon slot="icon">delete_outline</MdIcon>
    <form
      id="form"
      slot="content"
      method="dialog"
    >
      Xóa nhà xuất bản sẽ không thể khôi phục. Bạn có chắc chắn muốn xóa?
    </form>
    <div slot="actions">
      <md-text-button
        form="form"
        value="delete"
        @click="handleDeleteClick"
        >Xóa</md-text-button
      >
      <md-filled-tonal-button
        form="form"
        value="cancel"
        autofocus
        @click="closeDialog"
        >Trở về</md-filled-tonal-button
      >
    </div>
  </md-dialog>

  <!-- Add FAB -->
  <MdFloatingActionButton
    :icon="'add'"
    :size="'large'"
    :label="'add'"
    :variant="'secondary'"
    @click="showCreate"
  ></MdFloatingActionButton>
</template>

<style lang="scss" scoped>
.table-publisher {
  width: 100%;
}
.publisher {
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
