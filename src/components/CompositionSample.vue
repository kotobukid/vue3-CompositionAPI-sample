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
      tr(v-for="r in repositories")
        td {{ r.name }}
        td {{ r.created_at }}
    tbody(v-if="repositories.length === 0")
      tr
        td(colspan="2" v-if="repoLoaded") 条件を満たすリポジトリがありません
        td(colspan="2" v-if="!repoLoaded") リポジトリを読み込んでいます

</template>

<script>
import {toRefs} from 'vue'
import useUserRepositories from '../composables/useUserRepositories'
import useRepositoryNameSearch from '../composables/useRepositoriesNameSearch'

export default {
  components: {},
  props: {
    user: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { user } = toRefs(props)

    const { repositories, repoLoaded, getUserRepositories } = useUserRepositories(user)
    const { searchQuery, repositoriesMatchingSearchQuery } = useRepositoryNameSearch(repositories)

    return {
      searchQuery,
      repoLoaded,
      repositories: repositoriesMatchingSearchQuery,
      getUserRepositories
    }
  },
  data () {
    return {
      filters: {}
    }
  },
  methods: {
    updateFilters () {
      alert('!')
    }
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
