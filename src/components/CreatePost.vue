<template>
  <main role="main" class="col-md-4 mx-auto ml-sm-auto pt-5 px-4 mb-5">
    <div class="card bg-light">
      <div class="card-body">
        <h3 class="card-title my-3 pb-2 d-flex justify-content-center">
          Create Post
        </h3>
        <form class="" @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="" class="form-label">Title :</label>
            <input type="text" class="form-control" v-model="category.title" />
            <p v-if="errors.title" class="text-danger">{{ errors.title[0] }}</p>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">Description :</label>
            <textarea
              class="form-control"
              v-model="category.description"
              id=""
              name=""
              rows="5"
              cols="33"
            ></textarea>
            <p v-if="errors.description" class="text-danger">
              {{ errors.description[0] }}
            </p>
          </div>

          <div class="text-center mt-5">
            <button type="submit" class="btn btn-dark text-uppercase me-3 px-5">
              Create
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
      category: {
        title: "",
        description: "",
        user_id: "",
      },
      errors: {
        title: "",
        description: "",
      },
    };
  },
  mounted() {
    apiServices.getUser().then((response) => {
      this.category.user_id = response.data.user.id;
    });
  },
  methods: {
    onSubmit() {
      apiServices
        .createCategory(this.category)
        .then((response) => {
          this.$router.push({ name: "posts" });
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


