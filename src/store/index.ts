import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    user: []
  },
  getters: {
    showUser(state) {
      return state.user;
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async getUser({ commit }) {
      let response = await axios.get('http://127.0.0.1:8000/api/getUser', {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      })
      let user = response.data.user;
      let id = response.data.user.id
      let type = response.data.user.type
      localStorage.setItem("type", type)
      localStorage.setItem("id", id)
      commit('setUser', user)
    }
  },
  modules: {
  }
})
