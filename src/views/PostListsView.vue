<template>
  <div>
    <CommonHeader />
    <ProductLists />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CommonHeader from '@/components/CommonHeader.vue'; 
import ProductLists from '@/components/PostLists.vue'; 

export default defineComponent({
  name: 'PostListsView',
  components: {
    CommonHeader,
    ProductLists
  },
});
</script>
