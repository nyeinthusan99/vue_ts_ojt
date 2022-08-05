<template>
  <div>
    <CommonHeader />
    <UserLists />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CommonHeader from '@/components/CommonHeader.vue'; 
import UserLists from '@/components/UserLists.vue'; 

export default defineComponent({
  name: 'HomeView',
  components: {
    CommonHeader,
    UserLists
  },
});
</script>
