<template>
    <form @submit.prevent="userStore.signUp()">
        <input type="email" placeholder="email" v-model="userStore.registerEmail"> <br>
        <input type="text" placeholder="username" v-model="userStore.registerUsername"> <br>
        <input type="password" placeholder="password" v-model="userStore.registerPassword"> <br>
        <button type="submit">Sign up</button>
    </form>
</template>

<script>
import { useUserStore } from '@/stores/UserStore';
    export default {
        setup () {
            const userStore = useUserStore();
            return { userStore }
        }
    }
</script>