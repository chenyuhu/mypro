import Vue from 'vue'
import Vuex from 'vuex'
// import socketData from './dialog.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state:{//类似于data
      count:0,
      color:''
  },
  mutations:{//类似于methods
     increment(state,msg){
       state.count = msg
     },
      setBgc(state,url){
         state.color = url;
      }
  },
  getters:{//类似于methods
    optCount:function(state){
        return state.count;
    },
      getColor(state){
        return state.color
      }
  },
  actions: {

  },
    // modules: {
    //     dialog: socketData
    // }
})
