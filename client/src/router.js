import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Lobby from './views/Lobby.vue'
import Room from './views/Room.vue'
import Gameboard from './views/Gameboard.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: Lobby
    },
    {
      path: '/room',
      name: 'room',
      component: Room
    },
    {
      path: '/gameboard',
      name: 'gameboard',
      component: Gameboard
    }
  ]
})
