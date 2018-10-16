import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import mintUi from 'mint-ui';
import "bootstrap"
import 'mint-ui/lib/style.css';
// 解决 socket跨域问题
/**/import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'
Vue.use(VueSocketio, socketio('http://172.242.10.59:8080',"http://localhost:8080"), store);

Vue.use(mintUi);
// 3: 导入 vue-resource  用于发送异步请求
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.config.productionTip = false;

//给图片接一个公共的过滤器
Vue.filter("picFilter",function (val) {
    return `http://172.242.10.59:3000${val}`
});
Vue.filter('sexFilter',function (val) {
    if(val == 1){
        return '男';
    }else if(val == 0){
        return '女'
    }else{
        return '未填写'
    }
});
//统一请求的路径为了简写
Vue.http.options.root="http://172.242.10.59:3000/";
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//设置可以使用post
Vue.http.options.emulateJSON = true;
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css';
let Bus = new Vue;
new Vue({
  router,
  render: h => h(App),
  store,
  Bus,
}).$mount('#app');
