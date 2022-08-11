<template>
  <main role="main" class="col-md-12 ml-sm-auto pt-5 px-4 mb-5">
    <div class="card bg-light col-lg-9 mx-auto">
      <div class="card-body">
        <h3 class="card-title my-3 pb-2 d-flex justify-content-center">
          Upload Post Lists
        </h3>
        <div class="card-body">
          <form class="text-center" @submit.prevent="submitForm()">
            <div class="upload-container col-lg-12 col-md-12 col-sm-12">
              <input
                type="file"
                id="file"
                ref="file"
                v-on:change="fileUpload()"
                class="form-control-file"
              />
              <p v-if="error" class="text-danger">{{ error[0] }}</p>
              <p v-for="err in errs" class="text-danger" :key="err">
                {{ [err][0][0] }}
              </p>
            </div>

            <div class="text-center mt-4">
              <button class="btn btn-dark me-3" type="submit">Upload</button>
              <router-link :to="{ name: 'posts' }" class="btn btn-outline-dark">
                Cancel
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ls">
import {defineComponent} from 'vue';
import { mapGetters, mapActions } from "vuex";
import apiServices from "@/apiServices";
export default defineComponent({
  name:'UserUpload',
  data(){
    return {
      file:'',
      error:'',
      errs:[],
       user_id:''
  }
  },
  methods:{
    //to upload image
    fileUpload(){
      this.file = this.$refs.file.files[0];
    },

    //to upload post data
     submitForm(){
      let formData = new FormData();
      formData.append("file",this.file);

      apiServices.postUpload(formData,this.user_id)
      .then(response =>{
        this.$router.push("/posts");
      })
      .catch(error =>{
       if(error.response.status==400){
            this.error =error.response.data.errors.file
        }else{
          this.errs=error.response.data.errors
        }
        
      })
     },
  },
  mounted() {
    apiServices.getUser().then((response) => {
      this.user_id = response.data.user.id;
    });
  },
})
</script>

<style scoped>
.main {
  text-align: center;
}
.upload-container {
  position: relative;
}
.upload-container input {
  border: 1px solid #92b0b3;
  background: #f1f1f1;
  outline: 2px dashed #92b0b3;
  outline-offset: -10px;
  padding: 50px 30px 50px 100px;
  text-align: center !important;
}
.upload-container input:hover {
  background: #ddd;
}
</style>