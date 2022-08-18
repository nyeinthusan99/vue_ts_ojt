<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light row">
    <div class="container-fluid col-md-10">
      <h1>
        <router-link
          class="navbar-brand fs-3 text-dark homeNav fw-bold"
          :to="{ name: 'posts' }"
          >SCM</router-link
        >
      </h1>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav">
          <li>
            <router-link
              class="nav-item nav-link fw-bold"
              :to="{ name: 'dashboard' }"
              v-if="showUser.type == 0"
              >Users</router-link
            >
          </li>
          <li>
            <router-link
              class="nav-item nav-link fw-bold"
              :to="{ name: 'posts' }"
              >Posts</router-link
            >
          </li>
          <li class="nav-item dropdown fw-bold">
            <a
              class="nav-link dropdown-toggle fs-6"
              href="#"
              id="navbarDarkDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ showUser.name }}
            </a>
            <ul
              class="dropdown-menu dropdown-menu-dark"
              aria-labelledby="navbarDarkDropdownMenuLink"
            >
              <li>
                <button @click.prevent="logout" class="dropdown-item">Logout</button>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  :to="`/userprofile/${showUser.id}`"
                  >Profile</router-link
                >
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  :to="`/changepassword/${showUser.id}`"
                  >Change Password</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import apiServices from "@/apiServices";
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
export default defineComponent({
  name: "CommonHeader",
  methods: {
    //lotout user
    logout() {
      apiServices.logout()
      .then((response) => {
        localStorage.clear();
        this.$router.push("/");
      })
    },
    ...mapActions(["getUser"]),
  },
  computed: mapGetters(["showUser"]),
  mounted() {
    this.getUser();
  },
});
</script>

<style scoped>
.homeNav {
  text-decoration: none;
}
.nav-item {
  font-size: 18px;
}
.navbar-nav {
  margin-right: 75px;
}
</style>

