<template>
  <main role="main" class="col-md-4 mx-auto ml-sm-auto pt-5 px-4 mb-5">
    <div class="card bg-light">
      <div class="card-body">
        <h3 class="card-title my-3 pb-2 d-flex justify-content-center">
          Update Post
        </h3>
        <form class="" @submit.prevent="updatePost()">
          <div class="mb-3">
            <label for="" class="form-label">Title :</label>
            <input type="text" class="form-control" v-model="post.title" />
            <p v-if="errors.title" class="text-danger">{{ errors.title[0] }}</p>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">Description :</label>
            <textarea
              class="form-control"
              v-model="post.description"
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
              Update
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
  name: "UpdatePost",
  data() {
    return {
      post: {
        title: "",
        description: "",
        user_id: "",
      },
      errors: {
        title: "",
        description: "",
        user_id: "",
      },
    };
  },
  mounted() {
    apiServices.updateGetPost(this.$route.params.id).then((response) => {
      this.post = response.data.data;
    });
  },
  methods: {
    updatePost() {
      apiServices
        .postUpdate(this.$route.params.id, this.post)
        .then((response) => {
          this.post = response.data.data;
          this.$router.push("/posts");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
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