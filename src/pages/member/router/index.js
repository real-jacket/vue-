//1、使用vue-
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [{
  path: '/',
  component: require('../components/member.vue')
}, {
  path: '/address',
  component: require('../components/address.vue'),
  children: [{
      path: '',
      redirect: 'all'

    },
    {
      path: 'all',
      name: 'all',
      component: require('../components/all.vue')

    }, {
      path: 'form',
      name: 'form',
      component: require('../components/form.vue')
    }
  ]
}]

//2、创建router实例
let router = new Router({
  routes
})

export default router