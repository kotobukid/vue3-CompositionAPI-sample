<template lang="pug">
.hello
  h1 {{ msg }}
  ul
    li(v-for="i in items" v-text="i")
</template>

<script>
const o = {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      items: [1, 2, 3, 4, 5]
    }
  }
}

export default o
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
