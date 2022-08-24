<template>
  <div>
    <ForgotPassword />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ForgotPassword from '@/components/ForgotPassword.vue';

export default defineComponent({
  name: 'ForgotPasswordView',
  components: {
    ForgotPassword
  },
});
</script>