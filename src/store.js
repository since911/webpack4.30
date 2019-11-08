import Vue from 'vue'
import Vuex from 'vuex'
import {getArea} from '@/api/api'
Vue.use(Vuex)
export function createStore () {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      async fetchData({ commit }){
        return getArea().then(res =>{
          commit('setItem', res.data)
        }).catch(err => {
          commit('setItem', {a:'error'})
        })
      }
    },
    mutations: {
      setItem (state, data) {
        state.items = data
      }
    }
  })
}