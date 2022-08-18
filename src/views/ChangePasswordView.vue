<template>
    <div>
       <CommonHeader />
    <ChangePassword />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChangePassword from '@/components/ChangePassword.vue';
import CommonHeader from '@/components/CommonHeader.vue'; 
export default defineComponent({
  name:'CreateUserView',
  components: {
    ChangePassword,
    CommonHeader
  }
})
</script>

<style>

</style>