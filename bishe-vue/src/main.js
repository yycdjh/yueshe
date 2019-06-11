import Vue from 'vue'
import App from './App.vue'
import MintUI from 'mint-ui'
import Vuex from 'vuex'
import VueRouter from "vue-router"
import VueResource from "vue-resource"
import { Swipe, SwipeItem } from 'mint-ui';
import 'mint-ui/lib/style.css'
import './assets/css/weui.scss'
import $ from 'jquery';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css'; 
import VueParticles from 'vue-particles';

import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
Vue.use(VueSocketio, socketio('http://localhost:3001'),store);

//开启debug模式
Vue.config.debug = true;
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MintUI);
Vue.use(iView);
Vue.use(ElementUI);
Vue.use(VueParticles);

Vue.config.productionTip = false 
Vue.prototype.baseUrl = "http://localhost:3000"

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import store from './vuex/store'
//导航栏
import tabbar from './components/tabbar.vue'
import index from './components/index.vue'
import information from './components/information.vue'
import release from './components/release.vue'
import find from './components/find.vue'
import my from './components/my.vue'

//任务 —— 首页 
import task_list from './components/task/task_list.vue'
import task_content from './components/task/task_content.vue'
import task_comment from './components/task/task_comment.vue'
import uptask from './components/task/uptask.vue'
import downtask from './components/task/downtask.vue'
import htneirong3 from './components/task/htneirong3.vue'

//资讯 —— 轮播图
import announcement from './components/information/announcement.vue'
import information_tcontents from './components/information/information_tcontents.vue'

//论坛 —— 发帖
import htneirong from './components/foundDetail/htneirong.vue'
import plneirong from './components/foundDetail/plneirong.vue'
import forum from './components/foundDetail/forum.vue'
import my_forum from './components/foundDetail/forum.vue'
import write_communication from './components/foundDetail/write_communication.vue'

//我的 —— 操作
import login from './components/myDetail/login.vue'
import regist from './components/myDetail/regist.vue'
import center from './components/myDetail/center.vue'
import set from './components/myDetail/set.vue'
import options from './components/myDetail/options.vue'
import show from './components/myDetail/show.vue'
import write_show from './components/myDetail/write_show.vue'
import zhuye from './components/myDetail/zhuye.vue'

import chat from './components/chat'
import chat_list from './components/chat_list'
import news from './components/news.vue'
import search from './components/search.vue'






Vue.config.productionTip = false
// 创建一个路由器实例并且配置路由规则
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
    path: '/',
    components: { tabbar: tabbar },
    children:[
      {path:'/index',component:index},
      {path:'/information',component:information},
      {path:'/find',component:find},
      {path:'/my',component:my},
    ]
  },
  {path: '/release',component:release},
  {path:'/news',component:news},
  {path: '/search',component:search},
  {path: '/chat/:id',component:chat},
  {path: '/chat_list',component:chat_list},
  //我的
  {path:'/login',component:login},
  {path:'/regist',component:regist},
  {path:'/center',component:center},
  {path:'/options',component:options},
  {path: '/set',component:set},
  {path: '/show/:user_id',component:show},
  {path: '/write_show',component:write_show},
  {path: '/zhuye/:user_id&:task_id',component:zhuye},
  //任务
  {path: '/uptask',component:uptask},
  {path: '/downtask',component:downtask},
  {path: '/task_content/:task_id',component:task_content},
  {path: '/htneirong3/:task_id',component:htneirong3},
  {path: '/task_list/:user_id',component:task_list},
  {path: '/task_comment',component:task_comment},
  //论坛
  {path: '/forum',component:forum},
  {path: '/my_forum',component:my_forum},
  {path: '/htneirong/:communication_id',component:htneirong},
  {path: '/plneirong/:communication_id/:comment_id',component:plneirong},
  {path: '/write_communication',component:write_communication},
  //公告
  {path: '/announcement',component:announcement},
  {path: '/information_tcontents/:information_id',component:information_tcontents},
  ]
})


// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
      router: router,
      store,
      render: h => h(App)
}).$mount('#app')


