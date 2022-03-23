import Vue from 'vue'
import App from './App.vue'
// 引入路由管理器
import router from './router'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局样式
import './assets/css/index.css'
// 引入axios
import axios from 'axios'
// 封装axios
Vue.prototype.$http = axios 
// 使用element-ui
Vue.use(ElementUI)



Vue.config.productionTip = false

new Vue({
  router,
  e1: '#app',
  render: h => h(App),
}).$mount('#app')
