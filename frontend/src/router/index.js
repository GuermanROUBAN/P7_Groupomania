import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Register from '@/views/Register' // import de notre page Register
import Login from '@/views/Login'
import About from '@/views/About'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: '/register',
    name: 'Register', // nom de l'url pour faire des liens
    component: Register // c'est notre page 
  },
  {
    path: '/login',
    name: 'Login', // nom de l'url pour faire des liens
    component: Login // c'est notre page 
  }
]

const router = new VueRouter({
  routes
})

export default router
