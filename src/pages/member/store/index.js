//使用vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import Address from 'js/addressService.js'


//创建store实例
const store = new Vuex.Store({
    state: {//状态
        lists:null
    },
    mutations: {//同步事件处理
        init(state,lists) {
            state.lists = lists
        },
        add(state,instance) {
            state.lists.push(instance)
        },
        remove(state, id) {
            let lists = state.lists
            let index = lists.findIndex(item => {
                return item.id === id
            })
            lists.splice(index,1)
        },
        update(state, instance) {
            let lists = JSON.parse(JSON.stringify(state.lists))
            let index = lists.findIndex(item => {
              return item.id === instance.id
            })
            lists[index] = instance
            // state.lists = lists
        },
        setDefault(state,id) {
            let lists = state.lists
            lists.forEach(item => {
                return item.isDefault = item.id === id ? true : false
            })
        }
    },
    actions: {//异步事件处理
        getLists({commit}) {
            Address.list().then(res => {
                commit('init',res.data.lists)
            })
        },
        addAction({commit},instance) {
            Address.add(instance).then(res => {
                //模拟添加id。instacne最好后台返回
                instance.id = parseInt(Math.random()*1000)
                commit('add',instance)
            })
        },
        removeAction({commit},id){
            Address.remove(id).then(res => {
                commit('remove',id)
            })
        },
        updateAction({ commit }, instance) {
            Address.update(instance).then(res => {
                commit('update', instance)
            })
        },
        setDefaultAction({commit},id) {
            Address.setDefault(id).then(res => {
                commit('setDefault',id)
            })
        }
    }
})

export default store