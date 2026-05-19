import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import SportDetail from '../components/SportDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sport/:type',
    name: 'SportDetail',
    component: SportDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
