import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  //mode: 'hash',
  mode: 'history',//url中不出现#
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
