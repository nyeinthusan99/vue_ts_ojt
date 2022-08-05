<template>
    <div>
       <CommonHeader />
    <UpdateUser />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UpdateUser from '@/components/UpdateUser.vue';
import CommonHeader from '@/components/CommonHeader.vue'; 
export default defineComponent({
  name:'UpdateUserView',
  components: {
    UpdateUser,
    CommonHeader
  }
})
</script>

<style>

</style>