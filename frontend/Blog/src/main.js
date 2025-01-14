import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'
import BlogPosts from './components/BlogPosts.vue'
import SinglePost from './components/SinglePost.vue'

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.component('Navbar', Navbar);
app.component('Login', Login);
app.component('BlogPosts', BlogPosts);
app.component('SinglePost', SinglePost);


app.mount('#app');
