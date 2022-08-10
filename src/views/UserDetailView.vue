<template>
    <div>
      <CommonHeader />
      <UserDetail />
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import UserDetail from '@/components/UserDetail.vue';
import CommonHeader from '@/components/CommonHeader.vue'; 
export default defineComponent({
  name:'UserDetailView',
  components:{
    UserDetail,
    CommonHeader
  }
})
</script>

<style>

</style>