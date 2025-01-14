<script>
export default {
  data () {
    return {
      userAuthenticated: false,
    }
  }
}
</script>

<template>
  <header>
    <div class="wrapper">
       <Navbar />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
