<template>
<h1>Posts</h1>
<div v-if="userStore.userCheck">
    <div v-for="blogpost in userStore.posted" :key="blogpost.id">
        <div class="blog-post" >
            <!-- @click="singlePost(blogpost.id)" -->
            id: {{ blogpost.id }} <br>
            Title: {{ blogpost.title }} <br>
            Body: {{ blogpost.body }}
            <div>
                <button>Edit</button>
                <button @click="userStore.deletePost(blogpost.id)">Delete</button>
            </div>
        </div>
        <hr>
    </div>
</div>
<div v-else>
    <p>User not signed in</p>
</div>
</template>

<script>
import { useUserStore } from '@/stores/UserStore';
import router from '../router/index';

export default {
    setup () {
        const userStore = useUserStore();

        return { userStore }
    },
    data () {
        return {
            posted: []
        }
    },
    methods: {
        // async blogPosts() {
        //     try {
        //         const response = await fetch('http://localhost:8000/blog/', {
        //             method: 'GET',
        //             credentials: 'include',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'X-CSRFToken': this.userStore.csrfToken,
        //                 // 'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
        //             }
        //         });
        //         console.log(this.userStore.csrfToken)
        //         const data = await response.json();
        //         this.posted = data;
        //     } catch (error) {
        //         console.error('Error found: ', error);
        //     }
        // },
        async singlePost (id) {
            try {
                const response = await fetch('http://localhost:8000/blog/' + id, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': this.userStore.csrfToken,
                    }
                })
                const data = await response.json();
                console.log(data)
                
                const singlePost = data;

                this.$emit('viewSinglePost', singlePost);

                router.push('blog/' + id)

            } catch (error) {
                console.error('Error found: ', error)
            }
        }
    },
    emits: ['viewSinglePost'],
    mounted () {
        this.userStore.blogPosts();
        this.userStore.getCsrfToken();
    }
}
</script>

<style scoped>
.blog-post {
    padding: 10px;
    border-radius: 5px;
}

.blog-post:hover {
    background-color: antiquewhite;
}
</style>