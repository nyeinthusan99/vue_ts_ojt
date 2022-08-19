<template>
  <main role="main" class="col-md-4 mx-auto ml-sm-auto pt-5 px-4 mb-5">
    <div class="card bg-light">
      <div class="card-body">
        <h3 class="card-title my-3 pb-2 d-flex justify-content-center">
          Password Change
        </h3>
        <form class="" @submit.prevent="onSubmit">
          <div class="mb-3">
             <label for="" class="form-label">Old Password</label>
            <input
              type="password"
              class="form-control"
              v-model="changePw.oldPassword"
            />
            <p v-if="errors.oldPassword" class="text-danger">
              {{ errors.oldPassword[0] }}
            </p>
            <p v-if="errMsg" class="text-danger">
              {{ errMsg }}
            </p>
          </div>
          <div class="mb-3">
             <label for="" class="form-label">New Password</label>
            <input
              type="password"
              class="form-control"
              v-model="changePw.newPassword"
            />
            <p v-if="errors.newPassword" class="text-danger">
              {{ errors.newPassword[0] }}
            </p>
          </div>

          <div class="text-center mt-5">
            <button type="submit" class="btn btn-dark text-uppercase me-3 px-5">
              Change
            </button>

            <router-link
              :to="{ name: 'posts' }"
              class="btn btn-outline-dark text-uppercase px-5"
            >
              Cancel
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import apiServices from "@/apiServices";
export default defineComponent({
  name: "CreatePost",
  data() {
    return {
      changePw: {
        oldPassword: "",
        newPassword: "",
      },
      errors: {
        oldPassword: "",
        newPassword: "",  
      },
      errMsg:""
    };
  },
  mounted() {
     apiServices.getUser().then((response) => {
     
    });
  },
  methods: {
    onSubmit() {
      apiServices
        .changePassword(this.changePw)
        .then((response) => {
          localStorage.clear();
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
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

<style scoped>
textarea {
  resize: none;
}
</style>


