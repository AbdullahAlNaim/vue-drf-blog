import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import BlogView from '../views/BlogView.vue'
import PostView from '../views/PostView.vue'
import NewPostView from '@/views/NewPostView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue'),
      component: AboutView
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LoginView
    },
    {
      path: '/blog/:id',
      name: 'Post',
      component: PostView,
    },
    {
      path: '/new',
      name: 'NewPost',
      component: NewPostView,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    }
  ],
})

export default router