<!--<template lang="pug">-->
<!--.composition_sample-->
<!--  span.user {{ user }}-->
<!--  input(type="text" v-model="searchQuery")-->
<!--  br-->
<!--  span {{ searchQuery }}-->
<!--  br-->
<!--  table(style="width: 200px;")-->
<!--    colgroup-->
<!--      col(style="width: 100px")-->
<!--      col(style="width: 100px")-->
<!--    thead-->
<!--      tr-->
<!--        th 名前-->
<!--        th 作成日-->
<!--    tbody-->
<!--      tr(v-for="r in repositories")-->
<!--        td {{ r.name }}-->
<!--        td {{ r.created_at }}-->
<!--    tbody(v-if="repositories.length === 0")-->
<!--      tr-->
<!--        td(colspan="2" v-if="repoLoaded") 条件を満たすリポジトリがありません-->
<!--        td(colspan="2" v-if="!repoLoaded") リポジトリを読み込んでいます-->

<!--</template>-->

<script lang="jsx">
import {toRefs} from 'vue'
import useUserRepositories from '../composables/useUserRepositories'
import useRepositoryNameSearch from '../composables/useRepositoriesNameSearch'

export default {
  components: {},
  props: {
    user: {
      type: String,
      required: true,
      default: 'hage'
    }
  },
  setup (props) {
    const { user } = toRefs(props)

    const { repositories_, repoLoaded } = useUserRepositories(user)
    const { searchQuery, repositoriesMatchingSearchQuery } = useRepositoryNameSearch(repositories_)

    // mounted(getUserRepositories)

    // return {
    //   searchQuery,
    //   repoLoaded,
    //   repositories: repositoriesMatchingSearchQuery,
    //   getUserRepositories
    // }
    return () => (
      <div className="composition_sample">
        <span className="user">{user}</span>
        <input type="text" vModel={ searchQuery.value }/>
        <br/>
        <span>{searchQuery}</span>
        <br/>
        <table style="width: 200px;">
          <colgroup>
            <col style="width: 100px"/>
            <col style="width: 100px"/>
          </colgroup>
          <thead>
            <tr>
              <th>名前</th>
              <th>作成日</th>
            </tr>
          </thead>
          <tbody>
            {repositoriesMatchingSearchQuery.map(r => {
              return <>
                <td>{r.name}</td>
                <td>{r.created_at}</td>
              </>
            })}
          </tbody>
          {repositoriesMatchingSearchQuery.length === 0 && (
            <tbody>
              <tr>
                {
                  repoLoaded
                    ? <td colSpan="2">条件を満たすリポジトリがありません</td>
                    : <td colSpan="2">リポジトリを読み込んでいます</td>
                }
              </tr>
            </tbody>
          )}
        </table>
      </div>
    )
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
