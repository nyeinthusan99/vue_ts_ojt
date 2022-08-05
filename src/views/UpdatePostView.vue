<template>
    <div>
       <CommonHeader />
    <UpdatePost />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UpdatePost from '@/components/UpdatePost.vue';
import CommonHeader from '@/components/CommonHeader.vue'; 
export default defineComponent({
  name:'CreateUserView',
  components: {
    UpdatePost,
    CommonHeader
  }
})
</script>

<style>

</style>