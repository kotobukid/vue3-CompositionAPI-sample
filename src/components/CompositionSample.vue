<template lang="pug">
.composition_sample
  input(type="text" v-model="searchQuery")
  br
  span {{ searchQuery }}
  br
  table(style="width: 200px;")
    colgroup
      col(style="width: 100px")
      col(style="width: 100px")
    thead
      tr
        th 名前
        th 作成日
    tbody
      tr(v-for="r in filteredRepositories")
        td {{ r.name }}
        td {{ r.created_at }}
    tbody(v-if="filteredRepositories.length === 0")
      tr
        td(colspan="2") 条件を満たすリポジトリがありません

</template>

<script>
export default {
  components: {},
  props: {
    user: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      repositories: [],
      filters: {},
      searchQuery: '' // 2
    }
  },
  computed: {
    filteredRepositories () {
      if (this.searchQuery !== '') {
        return this.repositories.filter((f) => {
          return f.name.indexOf(this.filters) > -1
        })
      } else {
        return this.repositories
      }
    }, // 3
    repositoriesMatchingSearchQuery () {
      return 'hogege'
    } // 2
  },
  watch: {
    user: 'getUserRepositories' // 1
  },
  methods: {
    getUserRepositories () {
      this.repositories = [
        { name: 'hoge repo', created_at: '2020-01-01' },
        { name: 'fuga repo', created_at: '2020-01-02' }
      ]
    },
    updateFilters () {
      alert('!')
    } // 3
  },
  mounted () {
    this.getUserRepositories()
  }
}
</script>

<style scoped lang="less">
table {
  table-layout: fixed;
  border-collapse: collapse;
}

th, td {
  border: 1px solid grey;
  padding: 5px;
}

th {
  background-color: #1a1a1a;
  color: white;
}

td {
  background-color: white;
  color: black;
}
</style>
