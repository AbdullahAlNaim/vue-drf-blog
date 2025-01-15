<template>
    <form @submit.prevent="userStore.createPost()">
        <input type="text" placeholder="title" v-model="userStore.title"> <br>
        <input type="textbox" v-model="userStore.body"> <br>
        <button type="submit">Post</button>
    </form>
</template>

<script>
import { useUserStore } from '@/stores/UserStore';
    export default {
        setup () {
            const userStore = useUserStore()
            return { userStore }
        }
    }
</script>