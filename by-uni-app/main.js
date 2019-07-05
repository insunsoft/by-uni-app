import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false


import config from "./config.js"
// 引入vuex 状态库
import store from "./store";
// 状态数据
Vue.prototype.$store = store;
// 请求模块
import $ajax from "./tools/ajax.js";
Vue.prototype.$ajax = $ajax;

Vue.prototype.$back=function(){
	uni.navigateBack({
		delta:1
	})
}
Vue.prototype.$alert=function(msg){
	uni.showToast({
		title:msg,
		icon:"none"
	})
}
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



