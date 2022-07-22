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
        td(colspan="2" v-if="repoLoaded") 条件を満たすリポジトリがありません
        td(colspan="2" v-if="!repoLoaded") リポジトリを読み込んでいます

</template>

<script>
import {ref, onMounted, watch, toRefs, nextTick, computed} from 'vue'

// const counter = ref(0)
//
// console.log(counter) // { value: 0 }
// console.log(counter.value) // 0
//
// counter.value++
// console.log(counter.value) // 1

// const counter = ref(0)
// watch(counter, (newValue, oldValue) => {
//   console.log('The new counter value is: ' + counter.value)
// })
// counter.value = 100

const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2)

counter.value++
console.log(counter.value) // 1
console.log(twiceTheCounter.value) // 2

const fetchUserRepositories = (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const repos = [
        { name: 'hoge repo', created_at: '2020-01-01', owner: 'kotobuki' },
        { name: 'fuga repo', created_at: '2020-01-02', owner: 'kotobuki' },
        { name: 'AAA repo', created_at: '2022-01-01', owner: 'manjusai' },
        { name: 'BBB repo', created_at: '2022-01-02', owner: 'manjusai' }
      ]

      resolve(repos.filter(r => {
        return r.owner === user
      }))
    }, 1000)
  })
}

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
    const repoLoaded = ref(false)
    const repositories = ref([])
    const searchQuery = ref('')

    const getUserRepositories = async () => {
      repoLoaded.value = false
      repositories.value = []

      // eslint-disable-next-line vue/valid-next-tick
      await nextTick(async () => {
        repositories.value = await fetchUserRepositories(user.value)
        repoLoaded.value = true
      })
    }

    onMounted(getUserRepositories)

    watch(user, getUserRepositories)

    const filteredRepositories = computed(() => {
      return repositories.value.filter(f => {
        if (searchQuery.value !== '') {
          return repositories.value.filter((f) => {
            return f.name.includes(searchQuery.value) > -1
          })
        } else {
          return repositories.value
        }
      })
    })

    return {
      // repositories,
      repoLoaded,
      filteredRepositories,
      getUserRepositories // 返される関数は methods と同様の振る舞いをします
    }
  },
  data () {
    return {
      // repositories: [],
      filters: {}
    }
  },
  computed: {
    repositoriesMatchingSearchQuery () {
      return 'hogege'
    } // 2
  },
  methods: {
    // getUserRepositories () {
    //   this.repositories = [
    //     { name: 'hoge repo', created_at: '2020-01-01' },
    //     { name: 'fuga repo', created_at: '2020-01-02' }
    //   ]
    // },
    updateFilters () {
      alert('!')
    } // 3
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
