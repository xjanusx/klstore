import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase'

Vue.use(Vuex)
Vue.use(firebase)

export const store = new Vuex.Store({
  state: {
    isUserLoggedIn: false
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
})
