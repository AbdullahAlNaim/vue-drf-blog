<script>
</script>

<template>
    <nav>
        <RouterLink class="nav-options" to="/">Home</RouterLink>
        <RouterLink class="nav-options" to="/about">About</RouterLink>
        <RouterLink class="nav-options" to="/blogs">Blogs</RouterLink>
        <RouterLink class="nav-options" to="/login">Login</RouterLink>
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