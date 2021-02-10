import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutation";
import actions from "./action";
import getters from "./getters";

Vue.use(Vuex)

let state = {
  cartlist : []
}

export default new Vuex.Store({
  state,
  mutations ,
  actions ,
  getters,
  modules: {
  }
})
