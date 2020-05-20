import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _024b02fa = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _438d1fd0 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _2f8c0742 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _27c655f9 = () => interopDefault(import('../pages/private.vue' /* webpackChunkName: "pages/private" */))
const _864d91c2 = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _3230cc1d = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _6e763645 = () => interopDefault(import('../pages/user.vue' /* webpackChunkName: "pages/user" */))
const _1e925948 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _024b02fa,
    name: "about"
  }, {
    path: "/inspire",
    component: _438d1fd0,
    name: "inspire"
  }, {
    path: "/login",
    component: _2f8c0742,
    name: "login"
  }, {
    path: "/private",
    component: _27c655f9,
    name: "private"
  }, {
    path: "/profile",
    component: _864d91c2,
    name: "profile"
  }, {
    path: "/register",
    component: _3230cc1d,
    name: "register"
  }, {
    path: "/user",
    component: _6e763645,
    name: "user"
  }, {
    path: "/",
    component: _1e925948,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
