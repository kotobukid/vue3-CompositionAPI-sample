import {ref, onMounted, watch} from 'vue'

const fetchUserRepositories = (user) => {
  const repos = [
    { name: 'hoge repo', created_at: '2020-01-01', owner: 'kotobuki' },
    { name: 'fuga repo', created_at: '2020-01-02', owner: 'kotobuki' },
    { name: 'AAA repo', created_at: '2022-01-01', owner: 'manjusai' },
    { name: 'BBB repo', created_at: '2022-01-02', owner: 'manjusai' }
  ]

  return repos.filter(r => {
    return r.owner === user
  })
}

export default function useUserRepositories (user) {
  const repositories = ref([])
  const repoLoaded = ref(false)

  const getUserRepositories = () => {
    repoLoaded.value = false
    repositories.value = []

    repositories.value = fetchUserRepositories(user.value)
    repoLoaded.value = true
  }

  onMounted(getUserRepositories)
  watch(user, getUserRepositories)
  console.log(repositories.value)
  console.log(repoLoaded.value)

  return {
    repoLoaded,
    repositories,
    getUserRepositories
  }
}
