<template>
  <div class="row">
    <div class=" col-md-3 mx-auto mt-5 pt-5 col-12">
      <h2 class="text-center">LOG IN</h2>
      <p
        v-if="authfail"
        class="text-danger bg-light p-2 mt-3 text-center rounded"
      >
        {{ authfail }}
      </p>
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="" class="form-label">Email</label>
          <input type="" class="form-control" v-model="loginData.email" />
          <p v-if="errors.email" class="text-danger">{{ errors.email[0] }}</p>
        </div>
        <div class="mb-3">
          <label for="" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="loginData.password"
          />
          <p v-if="errors.password" class="text-danger">
            {{ errors.password[0] }}
          </p>
        </div>
        <div class="mb-3 mt-3">
          <button
            type="submit"
            class="btn btn-dark btn-block text-uppercase w-100"
          >
            log in
          </button>
        </div>
        <div class="mb-3">
          <router-link
            :to="{ name: 'signup' }"
            class="
              btn btn-outline-dark btn-block
              text-uppercase
              mb-3
              font-weight-bold
              w-100
            "
          >
            Register
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import apiServices from "@/apiServices";
export default defineComponent({
  name: "LogIn",
  data() {
    return {
      authfail: "",
      loginData: {
        email: "",
        password: "",
      },
      errors: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      apiServices
        .login(this.loginData)
        .then((response) => {
          console.log(response.data);
          let token = response.data.token;
          localStorage.setItem("token", token);
          this.$router.push({ name: "posts" });
          window.location.replace('posts')
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.authfail = error.response.data.error;
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