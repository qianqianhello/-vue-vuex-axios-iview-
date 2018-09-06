import Vue from 'vue'

// 导入vuex
import Vuex from 'vuex'

Vue.use(Vuex)
// 创建store仓库
let account = localStorage.getItem('account') || {}
console.log(account)
if(account!='undefined'&&account!=''){
   account = JSON.parse(account)
}
const store = new Vuex.Store({
    state:{//原始数据

        account: account || {}
    },
    mutations:{//做修改
        updateUser: (state,param) =>{
            state.account = param
            localStorage.setItem('account',JSON.stringify(param))
        }

    },
    actions: {

    },
    getters:{//查询
        user:(state) => state.account
        // getUser(state){
        //     return state.account
        // }
    }

})
export default store;