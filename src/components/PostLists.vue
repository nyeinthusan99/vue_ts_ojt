<template>
  <div class="row">
    <div class="col-md-10 mx-auto">
      <h3 class="mt-4">Post Lists</h3>
    </div>
  </div>
  <div class="row">
    <div class="col-md-10 mx-auto">
      <div class="d-inline">
        <form class="form-inline d-inline me-4" @submit.prevent="postListsView">
          <input
            class="form-control me-2 mt-2 search"
            type="text"
            placeholder="Title"
            v-model="searchForm.title"
          />
          <input
            class="form-control me-2 mt-2 search"
            type="text"
            placeholder="Description"
            v-model="searchForm.description"
          />
          <button
            class="btn btn-dark"
            type="submit"
          >
            <i class="fas fa-search"></i>
          </button>
        </form>
        <!-- <form class="form-inline d-inline me-4" @submit.prevent="postListsView2">
          <input
            class="form-control me-2 mt-2 search"
            type="text"
            placeholder="Description"
            v-model="descSearch"
          />
          <button
            class="btn btn-dark"
            type="submit"
          >
            <i class="fas fa-search"></i>
          </button>
        </form> -->
      </div>
      <router-link class="btn btn-dark me-3 px-4" :to="{ name: 'createpost' }"
        ><i class="fas fa-plus"></i> &nbsp; Add</router-link
      >
      <router-link class="btn btn-dark me-3" :to="{ name: 'postupload' }"
        ><i class="fas fa-upload"></i> &nbsp; Upload</router-link
      >
      <a
        type="button"
        :href="`http://127.0.0.1:8000/api/posts/export/${showUser.id}`"
      >
        <button class="btn btn-dark" >
          <i class="fas fa-download"></i> &nbsp; Download
        </button>
      </a>
      <!-- <button class="btn btn-dark" v-else :disabled="showUser.type == 1">
        <i class="fas fa-download"></i> &nbsp; Download
      </button> -->
      <span class="ms-5 ">{{count}} of {{total}}</span>
      <table class="table table-bordered table-striped table-responsive mt-4">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody v-if="data && data.length > 0">
          <tr v-for="(post, index) in data" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ post.title }}</td>
            <td>{{ post.description }}</td>
            <td class="text-center">
              <router-link
                :to="`/updatepost/${post.id}`"
                class="btn btn-dark me-3"
              >
                <i class="fas fa-pen"></i>
              </router-link>

              <button
                type="button"
                class="btn btn-danger"
                @click="confirmDelete(post.id)"
                data-bs-toggle="modal" data-bs-target="#exampleModal"
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
                        @click="deletePost()"
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
        <td v-else class="text-center fs-5" colspan="5">
          <p class="mt-3">No Data Found</p>
        </td>
      </table>
      <Pagination :data="postLists" @pagination-change-page="postListsView" />
    
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import apiServices from "@/apiServices";
import { mapGetters } from "vuex";
import LaravelVuePagination from "laravel-vue-pagination";

export default defineComponent({
  components: {
    Pagination: LaravelVuePagination,
  },
  data() {
    return {
      postLists: Object,
      data:Array,
      error: "",
      deleteId:"",
      total:'',
      count:'',
      searchForm:{
      title: "",
      description:"",
    }
    };
   
  },
  mounted() {
    this.postListsView();
  },
  computed: {
    ...mapGetters(["showUser"]),
  },
  methods: {
   async postListsView(page = 1) {
    await  apiServices
        .postList(page, this.searchForm)
        .then((response) => {
          this.postLists = response.data;
          this.data = response.data.data;
          this.total = response.data.total;
          this.count = response.data.to
          console.log(response.data)
        })
        .catch((error) => {
          this.error = error.response.data.Result;
        });
    },
  // async postListsView2(page = 1) {
  //   await  apiServices
  //       .postList2(page, this.descSearch)
  //       .then((response) => {
  //         this.postLists = response.data;
  //         this.data = response.data.data
  //       })
  //       .catch((error) => {
  //         this.error = error.response.data.Result;
  //       });
  //   },
    confirmDelete(id:any){
      this.deleteId = id
    },

   async deletePost() {
      await apiServices.deletePost(this.deleteId).then((res) => {
       this.postListsView();
        location.replace('/posts')
      });
    },
  },
});
</script>

<style scoped>
.form-control {
  width: 15% !important;
  display: inline-block;
}
</style>

