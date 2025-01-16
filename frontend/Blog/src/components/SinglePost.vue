<template>
    <div v-if="userState.userCheck">
        <div >
            <form @submit.prevent="userState.updatePost(userState.singleViewData.id)">
                <label for="title">Title: </label>
                <input type="text" v-model="userState.singleViewData.title"> <br>
                <label for="body">Body:</label>
                <input type="text" v-model="userState.singleViewData.body"> <br>
                <button type="submit">Update</button>
            </form>
        </div>
    </div>
    <div v-else>
        <p>User not signed in.</p>
    </div>
    
</template>

<script>
import { useUserStore } from '@/stores/UserStore';
export default {
    setup () {
        const userState = useUserStore();
        return { userState }
    },
    data () {
        return {
            id: '',
            title: '',
            body: '',
        }
    },
    methods: {
        handleViewPost (singlePost) {
            console.log('got new data')
        }
    },
    created () {
        this.handleViewPost;

    }
}
</script>