<template lang="pug">
img(alt="Vue logo" src="./assets/logo.png")
HelloWorld(msg="Welcome to Your Vue.js App")
select(v-model="user")
  option(value="") ユーザーを選択してください
  option(v-for="u in users" :value="u" v-text="u")
//CompositionSample(:user="user")
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
  },
  data () {
    return {
      users: ['kotobuki', 'manjusai'],
      user: ''
    }
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
