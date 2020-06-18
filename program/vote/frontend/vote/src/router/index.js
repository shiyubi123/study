import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/topics',
    children:[
      {
        path: 'invoke-vote',
        name: 'InvokeVote',
        component: () => import(/* webpackChunkName: "Home" */ '../views/home/invoke-vote')
      },
      {
        path: 'topics',
        name: 'Topics',
        component: () => import(/* webpackChunkName: "Home" */ '../views/home/topics')
      },
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Home" */ '../views/home')
  },
  {
    path: '/topic',
    name: 'Topic',
    redirect: '/topic/vote',
    component: () => import(/* webpackChunkName: "Home" */ '../views/topic'),
    children:[
      {
        path: 'vote',
        name: 'Vote',
        component: () => import(/* webpackChunkName: "Topic" */ '../views/topic/vote')
      },
      {
        path: 'result',
        name: 'Result',
        component: () => import(/* webpackChunkName: "Topic" */ '../views/topic/result')
      },
    ],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
