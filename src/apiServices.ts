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

    async postList(page:any,search:any):Promise<any>{
        return await axios.get(`posts?page=${page}&search=${search}`)
    }

    deletePost(id:any):Promise<any>{
        return  axios.delete(`posts/${id}`)
        
    }

    postUpload(formData:any):Promise<any>{
        return  axios.post('posts/import',formData)
    }

    updateGetPost(id:any):Promise<any>{
        return axios.get(`posts/${id}`)
    }

    postUpdate(id:any,post:any):Promise<any>{
        return axios.put(`posts/${id}`,post)
    }

    updateGetUser(id:any):Promise<any>{
        return axios.get(`users/${id}`)
    }

    updateUser(id:any,data:any):Promise<any>{
        return axios.post(`updateUser/${id}`,data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }

    userList(page:any,search:any):Promise<any>{
        return  axios.get(`userLists?page=${page}&search=${search}`)
    }

    deleteUser(id:any):Promise<any>{
        return  axios.delete(`users/${id}`)
    }

    userUpload(formData:any):Promise<any>{
        return  axios.post('users/import',formData)
    }

}

export default new apiServices();



