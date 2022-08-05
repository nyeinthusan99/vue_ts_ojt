<template>
  <div class="container mt-5">
    <div class="card bg-light col-lg-6 mx-auto">
      <div class="card-body">
        <div class="text-center">
          <img
            :src="'http://localhost:8000/' + showUser.image"
            alt="profile image"
            class="mb-5 w-25 h-25"
          />
        </div>
        <div class="ms-5 ps-5">
          <div class="row mb-2 d-flex justify-content-center">
            <div class="col-4"><label for="">Name</label></div>
            <div class="col-6">
              <p class="">{{ showUser.name }}</p>
            </div>
          </div>
          <div class="row mb-2 d-flex justify-content-center">
            <div class="col-4"><label for="">Email</label></div>
            <div class="col-6">
              <p class="">{{ showUser.email }}</p>
            </div>
          </div>
          <div class="row mb-2 d-flex justify-content-center">
            <div class="col-4"><label for="">Type</label></div>
            <div class="col-6">
              <p class="">{{ showUser.type }}</p>
            </div>
          </div>
          <div class="row mb-2 d-flex justify-content-center">
            <div class="col-4"><label for="">Phone</label></div>
            <div class="col-6">
              <p class="">{{ showUser.phone }}</p>
            </div>
          </div>
          <div class="row mb-2 d-flex justify-content-center">
            <div class="col-4"><label for="">Date Of Birth</label></div>
            <div class="col-6">
              <p v-if="showUser.dob">{{ showUser.dob }}</p>
               <p v-else>-</p>
            </div>
          </div>
          <div class="row mb-2 d-flex justify-content-center">
            <div class="col-4"><label for="">Address</label></div>
            <div class="col-6">
              <p v-if="showUser.address">{{ showUser.address }}</p>
              <p v-else>-</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  computed: mapGetters(["showUser"]),
});
</script>

<style scoped>
p,
label {
  text-align: left;
}
</style>