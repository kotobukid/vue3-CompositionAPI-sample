import {ref, computed} from 'vue'

export default function useRepositoryNameSearch (repositories) {
  const searchQuery = ref('')

  const repositoriesMatchingSearchQuery = computed(() => {
    if (searchQuery.value !== '') {
      return repositories.value.filter((repo) => {
        return repo.name.includes(searchQuery.value)
      })
    } else {
      return repositories.value
    }
  })

  return {
    searchQuery,
    repositoriesMatchingSearchQuery
  }
}
