<template>
  <div class="container-fluid">
    <Navbar/>
    <Alert/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Alert from '@/components/Alert.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Alert,
    Footer
  }
}
</script>

<style scoped lang="scss">
  .container-fluid {
    padding: 0;
    margin: 0;
    min-height: 100vh;
  }
</style>
