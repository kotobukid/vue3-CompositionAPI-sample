<script lang="jsx">
import {toRefs} from 'vue'

export default {
  props: {
    label: {
      type: String,
      default: 'LABEL'
    }
  },
  setup (props) {
    const {label} = toRefs(props)

    return () => (
      <div>{ label.value }</div>
    )
  }
}

</script>
