<template>
  <div class="container mt-5">
    <div class="card bg-light col-lg-6 mx-auto">
      <div class="card-body">
        <div class="text-center">
          <img
            :src="userDetail.image ? 'http://localhost:8000/' + userDetail.image : img"
            alt="profile image"
            class="mb-5 w-25 h-25"
          />
        </div>
        <div class="ms-5 ps-5">
          <div class="row mb-2 d-flex justify-content-center">
            <div class="col-4"><label for="">Name</label></div>
            <div class="col-6">
              <p class="">{{userDetail.name}}</p>
            </div>
          </div>
          <div class="row mb-2 d-flex justify-content-center">
            <div class="col-4"><label for="">Email</label></div>
            <div class="col-6">
              <p class="">{{userDetail.email}}</p>
            </div>
          </div>
          <div class="row mb-2 d-flex justify-content-center">
            <div class="col-4"><label for="">Type</label></div>
            <div class="col-6">
              <p class="">{{userDetail.type}}</p>
            </div>
          </div>
          <div class="row mb-2 d-flex justify-content-center">
            <div class="col-4"><label for="">Phone</label></div>
            <div class="col-6">
              <p class="">{{userDetail.phone}}</p>
            </div>
          </div>
          <div class="row mb-2 d-flex justify-content-center">
            <div class="col-4"><label for="">Date Of Birth</label></div>
            <div class="col-6">
              <p v-if="userDetail.dob">{{userDetail.dob}}</p>
               <p v-else>-</p>
            </div>
          </div>
          <div class="row mb-2 d-flex justify-content-center">
            <div class="col-4"><label for="">Address</label></div>
            <div class="col-6">
              <p v-if="userDetail.address">{{userDetail.address}}</p>
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
import apiServices from "@/apiServices";
export default defineComponent({
  data(){
    return{
      img: require("../assets/default.png"),
      userDetail:{
        name:'',
        email:'',
        type:'',
        phone:'',
        address:'',
        dob:'',
        image:''
      }
    }
  },
  mounted(){
    apiServices.userDetail(this.$route.params.id)
    .then((response)=>{
      this.userDetail=response.data.data
    })
  }
});
</script>

<style scoped>
p,
label {
  text-align: left;
}
</style>