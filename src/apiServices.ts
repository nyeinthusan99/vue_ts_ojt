import axios from "axios";

class apiServices{
    login(loginData:any): Promise<any> {
       return axios.post('login',loginData)          
    }

    signup(data:any):Promise<any>{
        return  axios.post("register",data)
    }

    createUser(data:any):Promise<any>{
        return  axios.post("users",data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }

    getUser():Promise<any>{
        return axios.get('getUser')
    }

    createCategory(category:any):Promise<any>{
        return axios.post('posts',category)
    }

    async postList(page:any,formData:any):Promise<any>{
        return await axios.get(`posts?page=${page}&title=${formData.title}&description=${formData.description}&type=${formData.type}&id=${formData.id}`)
    }

    userList(page:any,data:any,sort_direction:any,sort_field:any):Promise<any>{
        return  axios.get(`userLists?page=${page}&name=${data.name}&email=${data.email}&type=${data.type}&sort_direction=${sort_direction}&sort_filed=${sort_field}`)
    }

    deletePost(id:any):Promise<any>{
        return  axios.delete(`posts/${id}`)

    }

    postUpload(formData:any,id:any):Promise<any>{
        return  axios.post('posts/import',formData,id)
    }

    updateGetPost(id:any):Promise<any>{
        return axios.get(`posts/${id}`)
    }

    postUpdate(post:any):Promise<any>{
        return axios.post(`updatePost`,post)
    }

    updateGetUser(id:any):Promise<any>{
        return axios.get(`users/${id}`)
    }

    updateUser(data:any):Promise<any>{
        return axios.post(`updateUser`,data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
    
    deleteUser(id:any):Promise<any>{
        return  axios.delete(`users/${id}`)
    }

    userUpload(formData:any):Promise<any>{
        return  axios.post('users/import',formData)
    }

    userDetail(id:any): Promise<any>{
        return axios.get(`users/${id}`)
    }

    logout():Promise<any>{
        return axios.post('logout')
    }

    changePassword(data:any):Promise<any>{
        return axios.post('changepassword',data)
    }

    downloadUser(page:any,data:any):Promise<any>{
        return axios.get(`users/export?page=${page}&name=${data.name}&email=${data.email}&type=${data.type}`,{
            responseType:"blob"
        })
    }

    downloadPost(page:any,formData:any):Promise<any>{
        return axios.get(`posts/export?page=${page}&title=${formData.title}&description=${formData.description}&type=${formData.type}&id=${formData.id}`,{
            responseType:"blob"
        })
    }

    forgotPassword(data:any):Promise<any>{
        return axios.post(`password/forgotPassword`,data)
    }

    resetPassword(data:any):Promise<any>{
        return axios.post(`password/reset`,data)
    }
}

export default new apiServices();



