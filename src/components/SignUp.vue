<template>
  <div class="row">
    <div class="col-md-5 mx-auto mt-5 pt-5 col-12">
      <h2 class="text-center mb-3">REGISTER</h2>
      <form class="row" @submit.prevent="onSubmit">
        <div class="col-md-6 mb-3">
          <label for="" class="form-label">Name</label>
          <input type="text" class="form-control" v-model="registerData.name" />
          <p v-if="errors.name" class="text-danger">{{ errors.name[0] }}</p>
        </div>
        <div class="col-md-6 mb-3">
          <label for="" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
            v-model="registerData.email"
          />
          <p v-if="errors.email" class="text-danger">{{ errors.email[0] }}</p>
        </div>
        <div class="col-md-6 mb-3">
          <label for="" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="registerData.password"
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
            v-model="registerData.phone"
          />
          <p v-if="errors.phone" class="text-danger">{{ errors.phone[0] }}</p>
        </div>
        <div class="col-md-6 mb-3">
          <label for="" class="form-label">Birthday</label>
          <input
            type="date"
            class="form-control"
            name="birthday"
            v-model="registerData.dob"
          />
          <p v-if="errors.dob" class="text-danger">{{ errors.dob[0] }}</p>
        </div>
        <div class="col-md-6 mb-3">
          <label for="" class="form-label">Address</label>
          <input
            type="text"
            class="form-control"
            placeholder=" Main St"
            v-model="registerData.address"
          />
          <p v-if="errors.address" class="text-danger">
            {{ errors.address[0] }}
          </p>
        </div>
        <div class="col-md-6 mb-3">
          <label for="" class="form-label d-block">Profile</label>
          <input
            type="file"
            :src="
              image == null
                ? 'http://localhost:8000/' + registerData.image
                : image
            "
            class="form-control-file"
            @change="profileUpload"
          />
          <p v-if="errors.image" class="text-danger">{{ errors.image[0] }}</p>
        </div>
        <div class="mt-3 mb-3 text-end">
          <button
            type="submit"
            class="btn btn-dark  text-uppercase me-3 px-3"
          >
            Register
          </button>
       
          <router-link
            :to="{ name: 'login' }"
            class="
              btn btn-outline-dark 
              text-uppercase
              px-3
            "
          >
            log in
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import apiServices from "@/apiServices";
export default defineComponent({
  name: "SignUp",
  data() {
    return {
      image: null as unknown as File,
      registerData: {
        name: "",
        email: "",
        password: "",
        phone: "",
        dob: "",
        address: "",
        type: "1",
        image: "",
      },
      errors: {
        name: "",
        email: "",
        password: "",
        phone: "",
        dob: "",
        address: "",
        image: "",
      },
    };
  },
  methods: {
    //to upload image
    profileUpload(event: any) {
      const target = event.target as HTMLInputElement;
      if (target != null && target.files != null) {
        this.image = event.target.files[0];
      }
    },

    //to submit register data
    onSubmit() {
      var data = new FormData();
      data.append("name", this.registerData.name);
      data.append("email", this.registerData.email);
      data.append("password", this.registerData.password);
      data.append("phone", this.registerData.phone);
      data.append("dob", this.registerData.dob);
      if(this.registerData.address){
         data.append("address", this.registerData.address);
      }else{
        data.append("address",'')
      }
      data.append("type", this.registerData.type);
      data.append("image", this.image);

      apiServices
        .signup(data)
        .then((response) => {
          this.$router.push({ name: "login" });
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

