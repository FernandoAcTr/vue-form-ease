import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/examples/async-validation',
      component: () => import('./examples/AsyncValidation.vue')
    },
    {
      path: '/examples/basic-validation',
      component: () => import('./examples/BasicValidation.vue')
    },
    {
      path: '/examples/validators',
      component: () => import('./examples/BuiltInValidators.vue')
    },
    {
      path: '/examples/form-component',
      component: () => import('./examples/FormComponent.vue')
    },
    {
      path: '/examples/hot-validation',
      component: () => import('./examples/HotValidation.vue')
    },
    
  ]
})

export default router
