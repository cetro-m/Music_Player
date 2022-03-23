import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/discover',
    component: () => import('../views/discover/Discover.vue')
  },
  {
    path: '/video',
    component: () => import('../views/video/Video.vue')
  },
  {
    path: '/searchresult',
    component: () => import('../views/searchResult/SearchResult.vue')
  },
  {
    path: '/songsdetail',
    component: () => import('../views/songsDetail/SongsDetail.vue')
  },
  {
    path: '/videodetail',
    component: () => import('../views/videoDetail/VideoDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router