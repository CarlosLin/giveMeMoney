<template>
  <div>
    <el-tag>
      {{ statusData }}
    </el-tag>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
import { ElTag } from 'element-plus'

export default defineComponent({
  props: {
    statusData: {
      type: String,
      default: ''
    }
  },
  components: {
    ElTag
  },
  setup() {

  }
})
</script>
