<template>
    <div v-if="userState.userCheck">
        <h1>New Post</h1>
        <NewPost />
    </div>
    <div v-else>
        <p>User not signed in.</p>
    </div>
    
</template>

<script>
import NewPost from '@/components/NewPost.vue';
import { useUserStore } from '@/stores/UserStore';

    export default {
        setup () {
            const userState = useUserStore();
            return { userState }
        }
    }
</script>