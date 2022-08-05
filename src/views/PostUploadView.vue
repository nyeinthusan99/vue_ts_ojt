<template>
  <div>
    <CommonHeader />
    <PostUpload />
  </div>
</template>

<script lang="ls">
import {defineComponent} from 'vue';
import CommonHeader from '@/components/CommonHeader.vue';
import PostUpload from '@/components/PostUpload.vue'; 
export default defineComponent({
  name:'UserUploadView',
  components:{
    CommonHeader,
    PostUpload
  }
})
</script>

<style>

</style>