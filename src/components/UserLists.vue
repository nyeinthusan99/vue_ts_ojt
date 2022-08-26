<template>
  <div class="row">
    <div class="col-md-10 mx-auto">
      <h3 class="mt-4">User Lists</h3>
    </div>
  </div>

  <div class="row">
    <div class="col-md-10 mx-auto">
      <div class="">
        <form class="form-inline d-inline me-4" @submit.prevent="userListsView">
          <input
            class="form-control me-2 mt-2"
            type="text"
            placeholder="Name"
            v-model="search.name"
          />
          <input
            class="form-control me-2 mt-2"
            type="text"
            placeholder="Email"
            v-model="search.email"
          />
          <select class="form-control me-2 mt-2" v-model="search.type">
            <option value="" selected disabled>Type</option>
            <option value="0">Admin</option>
            <option value="1">User</option>
          </select>
          <button class="btn btn-dark" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>

      <router-link
        class="btn btn-dark me-3 px-4 mt-3"
        :class="{ disabled: showUser.type == 1 }"
        :to="{ name: 'createuser' }"
        ><i class="fas fa-plus"></i> &nbsp; Add</router-link
      >
      <router-link
        class="btn btn-dark me-3 px-4 mt-3"
        :class="{ disabled: showUser.type == 1 }"
        :to="{ name: 'userupload' }"
        ><i class="fas fa-upload"></i> &nbsp; Upload</router-link
      >
      <a
        type="button"
        @click.prevent="download()"
        v-if="showUser.type == 0"
      >
        <button class="btn btn-dark mt-3">
          <i class="fas fa-download"></i> &nbsp; Download
        </button>
      </a>

      <table class="table table-bordered table-striped table-responsive mt-4" id="sort">
        <thead>
          <tr>
            <th scope="col">Profile</th>
            <th scope="col">
              <a href="#" @click.prevent="change_sort('name')">Name</a>
              <span v-if="sort_direction == 'desc' && sort_field == 'name'">&uarr;</span>
              <span v-if="sort_direction == 'asc' && sort_field == 'name'">&darr;</span>
              </th>
            <th scope="col">
              <a href="#" @click.prevent="change_sort('email')">Email</a>
              <span v-if="sort_direction == 'desc' && sort_field == 'email'">&uarr;</span>
              <span v-if="sort_direction == 'asc' && sort_field == 'email'">&darr;</span>
              </th>
            <th scope="col">
              <a href="#" @click.prevent="change_sort('type')">Type</a>
              <span v-if="sort_direction == 'desc' && sort_field == 'type'">&uarr;</span>
              <span v-if="sort_direction == 'asc' && sort_field == 'type'">&darr;</span>
            </th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Date Of Birth</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody v-if="data && data.length > 0">
          <tr v-for="(user, index) in data" :key="index">
            <td @click.prevent="userDetail(user.id)">
              <img
                :src="user.image ? 'http://localhost:8000/' + user.image : img"
              />
            </td>
            <td @click.prevent="userDetail(user.id)">{{ user.name }}</td>
            <td @click.prevent="userDetail(user.id)">{{ user.email }}</td>
            <td @click.prevent="userDetail(user.id)" v-if="user.type == 1">
              User
            </td>
            <td @click.prevent="userDetail(user.id)" v-if="user.type == 0">
              Admin
            </td>
            <td @click.prevent="userDetail(user.id)">{{ user.phone }}</td>
            <td @click.prevent="userDetail(user.id)">{{ user.address }}</td>
            <td @click.prevent="userDetail(user.id)">{{ user.dob }}</td>
            <td class="text-center">
              <router-link
                :to="`/updateuser/${user.id}`"
                class="btn btn-dark me-lg-3"
              >
                <i class="fas fa-pen"></i>
              </router-link>

              <button
                v-if="showUser.id != user.id"
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
      <Pagination  :data="userLists" @pagination-change-page="userListsView" />
      
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
      search: {
        name: "",
        email: "",
        type: "",
      },
      page:1,
      userLists: Object,
      data: Array,
      deleteId: "",
      sort_direction:"desc",
      sort_field:"id"

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
      this.page = page;

      apiServices.userList(page, this.search,this.sort_direction,this.sort_field).then((response) => {
        this.userLists = response.data;
         this.data = response.data.data;      
      });
    },
    change_sort(field:any){
      if(this.sort_field == field){
       this.sort_direction = this.sort_direction == "asc" ? "desc" : "asc";
      }else{
         this.sort_field = field;
      }
      this.userListsView();
    },
    download(){
      apiServices.downloadUser(this.page,this.search)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const tag = document.createElement("a");
        tag.href = url;
        tag.setAttribute("download", "users.xlsx");
        document.body.appendChild(tag);
        tag.click();
      })
      .catch((errors) => {
        console.log(errors);
      })
      
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

    userDetail(id: any) {
      this.$router.push(`/userdetail/${id}`);
    },
  },
});

</script>

<style scoped>
.form-control {
  width: 15% !important;
  display: inline-block;
}
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
img {
  width: 100px;
}
a{
  text-decoration: none;
}
</style>

