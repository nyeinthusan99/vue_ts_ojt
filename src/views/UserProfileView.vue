<template>
    <div>
      <CommonHeader />
      <UserProfile />
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import UserProfile from '@/components/UserProfile.vue';
import CommonHeader from '@/components/CommonHeader.vue'; 
export default defineComponent({
  name:'UserProfileView',
  components:{
    UserProfile,
    CommonHeader
  }
})
</script>

<style>

</style>