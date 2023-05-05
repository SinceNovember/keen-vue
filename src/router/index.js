import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/'

Vue.use(Router)

export const constantRoutes = [
  { path: '/login', component: Login }

]
const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  linkActiveClass: 'active',
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
export default router

