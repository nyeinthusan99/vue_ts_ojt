<template>
    <div>
       <CommonHeader />
    <CreateUser />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateUser from '@/components/CreateUser.vue';
import CommonHeader from '@/components/CommonHeader.vue'; 
export default defineComponent({
  name:'CreateUserView',
  components: {
    CreateUser,
    CommonHeader
  }
})
</script>

<style>

</style>