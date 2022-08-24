<template>
  <main role="main" class="col-md-5 mx-auto pt-5 px-4 ">
    <div class="card bg-light col-lg-9 mx-auto">
        <div class="card-title pt-3">
            <h2 class="text-center">Forgot Password</h2>
       <div class="card-body">
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="" class="form-label">Email</label>
          <input  class="form-control" v-model="data.email" />
          <p v-if="errors.email" class="text-danger">{{ errors.email[0] }}</p>
          <p v-if="errMsg" class="text-danger">{{ errMsg }}</p>
        </div>
        <!-- <div class="mb-3">
          <label for="" class="form-label">Verification Code</label>
          <input  class="form-control" v-model="data.token" />
           <p v-if="errors.email" class="text-danger">{{ errors.email[0] }}</p>
        </div> -->
        <div class="mb-3">
             <label for="" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="data.password"
            />
            <p v-if="errors.password" class="text-danger">{{ errors.password[0] }}</p>
        </div>
          <div class="mb-3">
             <label for="" class="form-label">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              v-model="data.password_confirmation"
            />
             <p v-if="errors.password_confirmation" class="text-danger">{{ errors.password_confirmation[0] }}</p>
        </div>
        <div class="mt-3">
          <button
            type="submit"
            class="btn btn-dark "
          >
          Change
          </button>
        </div>
      </form>
       </div>
    </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import apiServices from "@/apiServices";
export default defineComponent({
  name: "LogIn",
  data() {
    return {
    data:{
        email:"",
        password:"",
        password_confirmation:"",
        token:this.$route.params.token
    },
     errors: {
        email: "",
        password:"",
        password_confirmation:""
      },
      errMsg:""
    };
  },
  methods: {
    onSubmit() {
      apiServices
        .resetPassword(this.data)
        .then((response) => {
          console.log(response)
           this.$router.push({ name: "login" });
        })
        .catch((error) => {
          console.log(error.response.data.errors)
          if (error.response.status == 400) {
             this.errMsg =error.response.data.message;
          } else {
             this.errors = error.response.data.errors;
          }
        });
    },
  },
});
</script>

<style>
</style>