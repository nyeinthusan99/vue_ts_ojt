<template>
  <div class="row">
    <div class="col-md-10 mx-auto">
      <h3 class="mt-4">User Lists</h3>
    </div>
  </div>

  <div class="row">
    <div class="col-md-10 mx-auto">
      <div class="d-inline">
        <label class="form-label me-2 fs-5">Name:</label>
        <form class="form-inline d-inline me-4" @submit.prevent="userListsView">
          <input
            class="form-control me-2 mt-2"
            type="text"
            placeholder="Search"
            v-model="search"
          />
          <button class="btn btn-dark" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
      <router-link
        class="btn btn-dark me-3 px-4"
        :class="{ disabled: showUser.type == 1 }"
        :to="{ name: 'createuser' }"
        ><i class="fas fa-plus"></i> &nbsp; Add</router-link
      >
      <router-link
        class="btn btn-dark me-3 px-4"
        :class="{ disabled: showUser.type == 1 }"
        :to="{ name: 'userupload' }"
        ><i class="fas fa-upload"></i> &nbsp; Upload</router-link
      >
      <a
        type="button"
        :href="`http://127.0.0.1:8000/api/users/export`"
        v-if="showUser.type == 0"
      >
        <button class="btn btn-dark">
          <i class="fas fa-download"></i> &nbsp; Download
        </button>
      </a>
      <button class="btn btn-dark" v-else :disabled="showUser.type == 1">
        <i class="fas fa-download"></i> &nbsp; Download
      </button>

      <table class="table table-bordered table-striped table-responsive mt-4">
        <thead>
          <tr>
            <th scope="col">Profile</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Type</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Date Of Birth</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody v-if="data && data.length > 0">
          <tr v-for="(user, index) in data" :key="index">
            <td>
              <img
                :src="user.image ? 'http://localhost:8000/' + user.image : img"
              />
            </td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td v-if="user.type == 1">User</td>
            <td v-if="user.type == 0">Admin</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.address }}</td>
            <td>{{ user.dob }}</td>
            <td class="text-center" v-if="showUser.type == 0">
              <router-link
                :to="`/updateuser/${user.id}`"
                class="btn btn-dark me-lg-3"
              >
                <i class="fas fa-pen"></i>
              </router-link>

              <button
                type="button"
                class="btn btn-danger"
                @click="confirmDelete(user.id)"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i class="fas fa-trash"></i>
              </button>

              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body fs-5 text-danger">
                      Are you sure to delete?
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        @click="deleteUser()"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td v-else-if="showUser.type == 1 && showUser.id == user.id">
              <router-link
                :to="`/updateuser/${user.id}`"
                class="btn btn-dark me-3"
              >
                <i class="fas fa-pen"></i>
              </router-link>

              <button
                type="button"
                class="btn btn-danger"
                @click="confirmDelete(user.id)"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i class="fas fa-trash"></i>
              </button>

              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body fs-5 text-danger">
                      Are you sure to delete?
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        @click="deleteUser()"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <td v-else class="text-center fs-5" colspan="8">
          <p class="mt-3">No Data Found</p>
        </td>
      </table>
      <Pagination :data="userLists" @pagination-change-page="userListsView" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters, mapActions } from "vuex";
import apiServices from "@/apiServices";
import LaravelVuePagination from "laravel-vue-pagination";
export default defineComponent({
  components: {
    Pagination: LaravelVuePagination,
  },
  data() {
    return {
      img: require("../assets/default.png"),
      search: "",
      userLists: Object,
      data: Array,
      deleteId: "",
    };
  },
  computed: {
    //get user info
    ...mapGetters(["showUser"]),
  },
  mounted() {
    this.userListsView();
  },
  methods: {
    //show user list & search
    userListsView(page = 1) {
      apiServices.userList(page, this.search).then((response) => {
        this.userLists = response.data;
        this.data = response.data.data;
      });
    },
    ...mapActions(["getUser"]),


    // to confirm delete or not
    confirmDelete(id: any) {
      this.deleteId = id;
    },

    //to delete user
    async deleteUser() {
      await apiServices.deleteUser(this.deleteId).then((response) => {
        this.userListsView();
        location.reload();
      });
    },
  },
});
</script>

<style scoped>
.form-control {
  width: 25% !important;
  display: inline-block;
}
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
img {
  width: 100px;
}
</style>