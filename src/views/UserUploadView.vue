<template>
  <div>
    <CommonHeader />
    <UserUpload />
  </div>
</template>

<script lang="ls">
import {defineComponent} from 'vue';
import CommonHeader from '@/components/CommonHeader.vue';
import UserUpload from '@/components/UserUpload.vue'; 
export default defineComponent({
  name:'UserUploadView',
  components:{
    CommonHeader,
    UserUpload
  }
})
</script>

<style>

</style>