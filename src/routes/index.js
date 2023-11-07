import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter({
  // Hash, History 모드 구별 가능
  // Hash
  // https://google.com/#/search
  // 검색시 #이 붙어서 검색되는거
  // 특정페이지 검색 시 페이지를 찾을 수 없다는걸 방지 가능
  history: createWebHashHistory(),
  // page 구분
  // https://google.com/
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/:notFound(.*)',   // 일치된 모든 경로들
      component: NotFound
    },

  ]
})