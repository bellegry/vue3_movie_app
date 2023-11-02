// import Vue from 'vue'
import { createApp } from 'vue'
import App from './App'
// import router from './routes/index.js'
// index.js라는 이름의 파일은 생략 가능
import router from './routes'
import store from './store'
import loadImage from './plugins/loadImage'

// Vue.createApp(App).mount('#app')
// cli part
createApp(App)
  // 플러그인 연결할 때 사용
  .use(router)  // $route, $router
  .use(store)   // $store
  .use(loadImage)
  .mount('#app')