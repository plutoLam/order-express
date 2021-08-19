import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import getters from './getters.js'
Vue.use(Vuex)
const state = {
  TableNum:1,
    cartlist:[],
    orderlist:[],
    order:{}
}
export default new Vuex.Store({
  state,
  mutations,
  getters
})
