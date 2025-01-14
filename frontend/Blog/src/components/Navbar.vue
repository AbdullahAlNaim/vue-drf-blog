<script>
import { useUserStore } from '@/stores/UserStore';

export default {
    setup () {
        const userStore = useUserStore()
        return { userStore }
    }
}
</script>

<template>
    <nav>
        <RouterLink class="nav-options" to="/">Home</RouterLink>
        <RouterLink class="nav-options" to="/about">About</RouterLink>
        <RouterLink class="nav-options" to="/blogs">Blogs</RouterLink>
        <span v-if="!userStore.userCheck">
            <RouterLink class="nav-options" to="/login">Login</RouterLink>
        </span>
        <span v-else @click="userStore.logout">
            <RouterLink class="nav-options" to="/logout">Logout</RouterLink>
        </span>
        
    </nav>
</template>

<style scoped>
nav {
    padding: 10px;
    list-style: none;
}

.nav-options {
    padding: 5px;
}

.nav-options:hover {
    background-color: rgb(96, 139, 139);
}
</style>