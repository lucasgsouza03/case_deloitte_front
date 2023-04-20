import { createRouter, createWebHistory } from 'vue-router'
import RegisterStudent from '../views/RegisterStudent.vue'
import Index from "../views/Index.vue"
import notFound from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/register-student',
    name: 'Register Student',
    component: RegisterStudent
  },
  {
    path: '/',
    name: 'Index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Index
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: notFound,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
