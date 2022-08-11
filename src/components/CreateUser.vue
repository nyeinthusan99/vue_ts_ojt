<template>
  <main role="main" class="col-md-6 mx-auto ml-sm-auto pt-5 px-4 mb-5">
    <div class="card bg-light">
      <div class="card-body">
        <h3 class="card-title my-3 pb-2 d-flex justify-content-center">
          Create User
        </h3>
        <form class="row" @submit.prevent="onSubmit">
          <div class="col-md-6 mb-3">
            <label for="" class="form-label">Name</label>
            <input type="text" class="form-control" v-model="createData.name" />
            <p v-if="errors.name" class="text-danger">{{ errors.name[0] }}</p>
          </div>
          <div class="col-md-6 mb-3">
            <label for="" class="form-label">Email</label>
            <input
              class="form-control"
              aria-describedby="emailHelp"
              v-model="createData.email"
            />
            <p v-if="errors.email" class="text-danger">{{ errors.email[0] }}</p>
          </div>
          <div class="col-md-6 mb-3">
            <label for="" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="createData.password"
            />
            <p v-if="errors.password" class="text-danger">
              {{ errors.password[0] }}
            </p>
          </div>
          <div class="col-md-6 mb-3">
            <label for="" class="form-label">Phone</label>
            <input
              type="text"
              class="form-control"
              v-model="createData.phone"
            />
            <p v-if="errors.phone" class="text-danger">{{ errors.phone[0] }}</p>
          </div>
          <div class="col-md-6 mb-3">
            <label for="" class="form-label">Birthday</label>
            <input
              type="date"
              class="form-control"
              name="birthday"
              :max="new Date().toISOString().substr(0, 10)"
              v-model="createData.dob"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="" class="form-label">Type</label>
            <select class="form-control" v-model="createData.type" id="">
              <option value="" selected disabled>--- Select one ---</option>
              <option value="0">Admin</option>
              <option value="1">User</option>
            </select>
            <p v-if="errors.type" class="text-danger">{{ errors.type[0] }}</p>
          </div>
          <div class="col-md-6 mb-3">
            <label for="" class="form-label">Address</label>
            <input
              type="text"
              class="form-control"
              v-model="createData.address"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="" class="form-label d-block">Profile</label>
            <input
              type="file"
              class="form-control-file"
              @change="profileUpload"
            />
            <img :src="previewImage" alt="" class="w-100 mt-3" />
          </div>
          <div class="mt-3 text-end">
            <button
              type="submit"
              class="btn btn-dark me-3 text-uppercase font-weight-bold"
            >
              Create
            </button>

            <router-link
              :to="{ name: 'dashboard' }"
              class="btn btn-outline-dark text-uppercase font-weight-bold"
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
  name: "CreateUser",
  data() {
    return {
      previewImage: null as unknown as File,
      image: null as unknown as File,
      createData: {
        name: "",
        email: "",
        password: "",
        phone: "",
        dob: "",
        address: "",
        type: "",
        image: "",
      },
      errors: {
        name: "",
        email: "",
        password: "",
        phone: "",
        type: "",
      },
    };
  },
  methods: {
    profileUpload(event: any) {
      this.image = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      fileReader.readAsDataURL(this.image);
    },
    onSubmit() {
      var data = new FormData();
      data.append("name", this.createData.name);
      data.append("email", this.createData.email);
      data.append("password", this.createData.password);
      data.append("phone", this.createData.phone);
      data.append("dob", this.createData.dob);
      if (this.createData.address) {
        data.append("address", this.createData.address);
      } else {
        data.append("address", "");
      }
      data.append("type", this.createData.type);
      data.append("image", this.image);

      apiServices
        .createUser(data)
        .then((response) => {
          this.$router.push({ name: "dashboard" });
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
});
</script>

<style>
</style>