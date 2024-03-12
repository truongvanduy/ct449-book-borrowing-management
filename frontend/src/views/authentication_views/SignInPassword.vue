<script setup>
import { useRouter } from 'vue-router'
import AuthenticationLayout from '@/layouts/AuthenticationLayout.vue'
import userService from '@/services/user.service'
import { onMounted, ref } from 'vue'
import MdIcon from '@/components/icons/MdIcon.vue'
const { id } = defineProps({
  id: String
})
const router = useRouter()
const loading = ref(false)

const user = ref({})
const password = ref('')

onMounted(async () => {
  if (id) {
    try {
      loading.value = true
      const respones = await userService.getById(id)
      user.value = respones.data
    } catch (err) {
      console.log(err)
    }
    loading.value = false
  } else {
    console.log('No id')
  }
})

const errorMessage = ref('')

async function handleSignIn() {
  try {
    loading.value = true
    const response = await userService.signIn({
      email: user.value?.email,
      password: password.value
    })

    const { id } = response.data
    const userInfo = await userService.getById(id)

    localStorage.setItem('user', JSON.stringify(userInfo.data))

    router.push({
      name: 'home'
    })
  } catch (error) {
    console.log(error)
    errorMessage.value = error.response?.data?.message || 'Đã có lỗi xảy ra'
    loading.value = false
  }

  loading.value = false
}
</script>
<template>
  <AuthenticationLayout :loading="loading">
    <template #title>Chào mừng</template>

    <template #greeting>
      <md-assist-chip
        class="chip"
        :label="user?.email ? user.email : ''"
        @click="
          router.push({
            name: 'sign-in-email',
            props: {
              email: user?.email ? user.email : ''
            }
          })
        "
      >
        <MdIcon
          slot="icon"
          :style="'filled'"
          >account_circle</MdIcon
        >
      </md-assist-chip>
    </template>

    <template #form>
      <!-- Form fields -->

      <input
        type="hidden"
        class="auth-form-text-field"
        name="email"
        :value="user?.email"
      />

      <md-outlined-text-field
        class="auth-form-text-field"
        type="password"
        label="Mật khẩu"
        name="password"
        v-model="password"
        @keyup.enter="handleSignIn"
        :error="errorMessage && !loading ? true : undefined"
        :error-text="errorMessage"
        autocomplete="new-password"
      ></md-outlined-text-field>

      <!-- Form suggest -->
      <div class="auth-form-suggest">
        <router-link to="/">Bạn quên mật khẩu?</router-link>
      </div>

      <!-- Form actions -->
      <div class="auth-form-action">
        <md-filled-button
          :disabled="loading ? 'disabled' : undefined"
          @click.prevent="handleSignIn"
          >Tiếp theo</md-filled-button
        >
      </div>
    </template>
  </AuthenticationLayout>
</template>

<style lang="scss" scoped>
.chip md-icon {
  font-size: 1.125rem;
}
</style>
