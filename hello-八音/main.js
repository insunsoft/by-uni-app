import Vue from 'vue'
import App from './App'

import basics from './pages/basics/home.vue'
Vue.component('basics',basics)

import components from './pages/component/home.vue'
Vue.component('components',components)

import plugin from './pages/plugin/home.vue'
Vue.component('plugin',plugin)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
// 登录页
import byLogin from './common/pages/login/login.vue'
Vue.component('by-login',byLogin)
// 支付成功页
import byPaySucc from './common/pages/pay_succ/pay_succ.vue'
Vue.component('by-pay-succ',byPaySucc)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



