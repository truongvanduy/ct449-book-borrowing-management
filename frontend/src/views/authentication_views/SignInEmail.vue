<script setup>
import AuthenticationLayout from '@/layouts/AuthenticationLayout.vue'
import { ref } from 'vue'
import userService from '@/services/user.service'
import { useRouter } from 'vue-router'
const email = ref('')
const userId = ref(null)
const errorMessage = ref('')
const router = useRouter()

const loading = ref(false)

const getEmail = async () => {
  try {
    loading.value = true
    const response = await userService.getByEmail(email.value)
    loading.value = false

    userId.value = response.data._id
    router.push({ name: 'sign-in-password', params: { id: userId.value } })
  } catch (err) {
    loading.value = false
    console.log(err)
    errorMessage.value = err.response.data.message || 'Đã có lỗi xảy ra'
  }
}
</script>
<template>
  <AuthenticationLayout :loading="loading">
    <template #title> Đăng nhập </template>

    <template #greeting>
      <p>Nhập địa chỉ email của bạn để tiếp tục</p>
    </template>

    <template #form>
      <md-outlined-text-field
        class="auth-form-text-field"
        type="email"
        label="Email"
        name="email"
        v-model="email"
        @keyup.enter="getEmail"
        :error="errorMessage && !loading ? '' : undefined"
        :error-text="!loading && errorMessage"
      ></md-outlined-text-field>
      <div class="auth-form-suggest">
        <p>Bạn chưa có tài khoản?</p>
        <router-link :to="{ name: 'sign-up-email' }">Tạo tài khoản</router-link>
      </div>

      <div class="auth-form-action">
        <md-filled-button
          @click.prevent="getEmail"
          :disabled="loading ? 'disabled' : undefined"
          >Tiếp theo</md-filled-button
        >
      </div>
    </template>
  </AuthenticationLayout>
</template>

<style lang="scss" scoped></style>
