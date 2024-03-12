<script setup>
import AuthenticationLayout from '@/layouts/AuthenticationLayout.vue'
import { ref } from 'vue'
import userService from '@/services/user.service'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const route = useRoute()
const email = ref(route.query.email || '')
defineExpose({ email })

const loading = ref(false)
const errorMessage = ref('')

const proceed = async () => {
  try {
    loading.value = true
    const response = await userService.getByEmail(email.value)
    loading.value = false

    if (response) {
      errorMessage.value = 'Email đã được sử dụng, vui lòng sử dụng email khác'
    }
  } catch (err) {
    loading.value = false
    console.log(err)
    if (err.response.status === 404) {
      router.push({ name: 'sign-up-password', params: { email: email.value } })
    } else {
      errorMessage.value = err.response.data.message
    }
  }
}
</script>
<template>
  <AuthenticationLayout :loading="loading">
    <template #title> Tạo tài khoản </template>

    <template #greeting>
      <p>Nhập địa chỉ email của bạn</p>
    </template>

    <template #form>
      <md-outlined-text-field
        class="auth-form-text-field"
        type="email"
        label="Email"
        name="email"
        v-model="email"
        @keyup.enter="proceed"
        :error="errorMessage && !loading ? '' : undefined"
        :error-text="!loading && errorMessage"
      ></md-outlined-text-field>
      <div class="auth-form-suggest">
        <p>Bạn đã có tài khoản?</p>
        <router-link :to="{ name: 'sign-in-email' }">Đăng nhập</router-link>
      </div>

      <div class="auth-form-action">
        <md-filled-button
          @click.prevent="proceed"
          :disabled="loading ? 'disabled' : undefined"
          >Tiếp theo</md-filled-button
        >
      </div>
    </template>
  </AuthenticationLayout>
</template>

<style lang="scss" scoped></style>
