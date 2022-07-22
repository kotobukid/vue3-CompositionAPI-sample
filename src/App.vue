<template lang="pug">
img(alt="Vue logo" src="./assets/logo.png")
HelloWorld(msg="Welcome to Your Vue.js App")
CompositionSample
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import CompositionSample from './components/CompositionSample.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    CompositionSample
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
