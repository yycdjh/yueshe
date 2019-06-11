import Vue  from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)


var state={
    id:'',
    user:'',
    user_img:'',
    user_name:'',
    like:'',
    userlist:[],
    img:"/static/img/touxiang/0.png",
    img2:"/static/img/star1.png",
    selectTab: '首页',
    username:'',
    usertel:'',
    userpsw:'',
    show1:true,
    show2:false,
    introduction:'',
    value:'',
    usercity:'',
    birthday:'',
    chatState: {
        account: null,
        nickName: null
      },
      groupState: null   //  点击进群的时候更新

}

export default new Vuex.Store({
    state,
    mutations: {
        updateChatState (state, obj) {
          state.chatState = obj
        },
        updateGroupState (state, obj) {
          state.groupState = obj
        }
      },
      actions: {
        // changeSideBarState (context, status) {
        //   context.commit('changeSideBarState', status)
        // }
        // es6解构写法
        updateChatState ({commit}, obj) {
          commit('updateChatState', obj)
        },
        updateGroupState ({commit}, obj) {
          commit('updateGroupState', obj)
        }
      },
      getters: {
        getChatState (state) {
          return state.chatState
        },
        getGroupState (state) {
          return state.groupState
        }
      }
})
