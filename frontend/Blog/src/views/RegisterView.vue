<template>
    <div v-if="!userStore.userCheck">
        <h1>Register</h1>
        <SignUp />
    </div>
    <div v-else>
        <p>User already signed in.</p>
    </div>
</template>

<script>
import SignUp from '@/components/SignUp.vue';
import { useUserStore } from '@/stores/UserStore';
    export default {
        setup () {
            const userStore = useUserStore();
            return {  userStore }
        }
    }
</script>