<script setup>
import { useSignInDialogStore } from '@/stores/SignInDialogStore'
import { watchEffect, ref } from 'vue'
import { useRouter } from 'vue-router'

const signInDialog = ref(null)
const SignInDialogStore = useSignInDialogStore()

watchEffect(async () => {
  if (SignInDialogStore.isOpen) {
    await signInDialog.value?.show()
  } else {
    await signInDialog.value?.close()
  }
})

function closeDialog() {
  SignInDialogStore.close()
}

const router = useRouter()
function toAuthentication() {
  router.push('/authentication')
  closeDialog()
}
</script>

<template>
  <md-dialog
    ref="signInDialog"
    @close="closeDialog"
  >
    <div slot="headline">Đăng nhập</div>
    <form
      slot="content"
      id="sign-in-form"
      class="sign-in-form"
      method="dialog"
    >
      Vui lòng đăng nhập để mượn sách
      <md-filled-text-field
        label="Email"
        @keyup.enter="toAuthentication"
      >
      </md-filled-text-field>
    </form>
    <div
      slot="actions"
      class="sign-in-form-actions"
    >
      <md-filled-button
        ref="continueButton"
        @click="toAuthentication"
        >Tiếp tục</md-filled-button
      >
      <md-text-button @click="closeDialog">Đóng</md-text-button>
    </div>
  </md-dialog>
</template>

<style lang="scss">
.sign-in-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: clamp(20rem, 25vw, 30rem);
  &-actions {
    display: flex;
    flex-direction: row-reverse;
    justify-content: end;
  }
}
</style>
