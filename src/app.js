// app.js
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

export function createApp () {
  // 创建 router 实例
  const router = createRouter()
  const store = createStore()

  // 同步路由状态(route state)到 store
  sync(store, router)
  
  const app = new Vue({
    router,
    render: h => h(App)
  })

  // 返回 app 和 router
  return { app, router }
}