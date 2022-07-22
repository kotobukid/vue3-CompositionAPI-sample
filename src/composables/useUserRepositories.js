import {ref, onMounted, watch, nextTick} from 'vue'

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

export default function useUserRepositories (user) {
  const repositories = ref([])
  const repoLoaded = ref(false)

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

  return {
    repoLoaded,
    repositories,
    getUserRepositories
  }
}
