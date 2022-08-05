<template>
    <div>
       <CommonHeader />
    <CreatePost />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreatePost from '@/components/CreatePost.vue';
import CommonHeader from '@/components/CommonHeader.vue'; 
export default defineComponent({
  name:'CreateUserView',
  components: {
    CreatePost,
    CommonHeader
  }
})
</script>

<style>

</style>