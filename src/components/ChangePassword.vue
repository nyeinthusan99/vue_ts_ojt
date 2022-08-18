<template>
  <main role="main" class="col-md-4 mx-auto ml-sm-auto pt-5 px-4 mb-5">
    <div class="card bg-light">
      <div class="card-body">
        <h3 class="card-title my-3 pb-2 d-flex justify-content-center">
          Create Post
        </h3>
        <form class="" @submit.prevent="onSubmit">
          <div class="mb-3">
             <label for="" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="changePw.oldPassword"
            />
            <p v-if="errors.oldPassword" class="text-danger">
              {{ errors.oldPassword[0] }}
            </p>
          </div>
          <div class="mb-3">
             <label for="" class="form-label">Password</label>
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
import { mapGetters, mapActions } from "vuex";
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
          this.$router.push({ name: "dashboard" });
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    ...mapActions(["getUser"]),
  },

  computed: {
    ...mapGetters(["showUser"]),
  },
});
</script>

<style scoped>
textarea {
  resize: none;
}
</style>


