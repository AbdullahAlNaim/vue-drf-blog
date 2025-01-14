<template>
    <p>Hello single post</p>
    <div @viewSinglePost="handleViewPost">

    </div>
</template>

<script>
export default {
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