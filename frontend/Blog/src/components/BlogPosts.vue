<script>
export default {
    data () {
        return {
            posted: []
        }
    },
    methods: {
        async blogPosts() {
            try {
                const response = await fetch('http://localhost:8000/blog/');
                const data = await response.json();
                this.posted = data;
            } catch (error) {
                console.error('Error found: ', error);
            }
        }
    },
    mounted () {
        this.blogPosts();
    }
}
</script>

<template>
<h1>Posts</h1>
<ul>
    <div v-for="blogpost in posted">
        <li>
            {{ blogpost.title }} <br>
            {{ blogpost.body }}
        </li>
    </div>
</ul>
</template>