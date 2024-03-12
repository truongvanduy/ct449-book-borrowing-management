<script setup>
import { useRouter } from 'vue-router'
import AuthenticationLayout from '@/layouts/AuthenticationLayout.vue'
import userService from '@/services/user.service'
import { onMounted, ref } from 'vue'
import MdIcon from '@/components/icons/MdIcon.vue'
const { email } = defineProps({
  email: String
})
const router = useRouter()

const password = ref('')

onMounted(async () => {
  if (email) {
    console.log(email)
  }
})

const loading = ref(false)
const errorMessage = ref('')

async function handleSignUp() {
  try {
    loading.value = true
    const result = await userService.signUp({ email, password: password.value })

    if (result) {
      router.push({ name: 'sign-in-email' })
    }
  } catch (error) {
    errorMessage.value = error.response.data.message
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
        :label="email ? email : ''"
        @click="
          router.push({
            name: 'sign-up-email',
            query: {
              email: email
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
        :value="email"
      />

      <md-outlined-text-field
        class="auth-form-text-field"
        type="password"
        label="Mật khẩu"
        name="password"
        v-model="password"
        @keyup.enter="handleSignUp"
        :error="errorMessage ? '' : undefined"
        :error-text="errorMessage"
      ></md-outlined-text-field>

      <!-- Form suggest -->
      <div class="auth-form-suggest">
        <router-link to="/">Bạn quên mật khẩu?</router-link>
      </div>

      <!-- Form actions -->
      <div class="auth-form-action">
        <md-filled-button @click.prevent="handleSignUp">Tiếp theo</md-filled-button>
      </div>
    </template>
  </AuthenticationLayout>
</template>

<style lang="scss" scoped>
.chip md-icon {
  font-size: 1.125rem;
}
</style>
