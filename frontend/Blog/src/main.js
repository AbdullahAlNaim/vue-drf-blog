// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'
import BlogPosts from './components/BlogPosts.vue'

const app = createApp(App)

app.use(router)

app.component('Navbar', Navbar)
app.component('Login', Login)
app.component('BlogPosts', BlogPosts)


app.mount('#app')
