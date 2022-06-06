<script setup lang="ts">
import { ref, watch } from 'vue'

defineProps<{ msg: string }>()
function useSyncUndo(source: any, options: {}) {
  const history = ref([source.value])
  let undoing = false
  const _commit = () => {
    history.value.unshift(source.value)
  }
  const _undo = () => {
    console.log('enter undo')
    if (history.value.length > 1) {
      history.value.shift()
      source.value = history.value[0]
    }
  }
  const stop = watch(
    source,
    () => {
      console.log('watch')
      if (!undoing) {
        _commit()
      }
    },
    { ...options, flush: 'sync' },
  )
  function undo() {
    console.log('undo1')
    undoing = true
    _undo()
    undoing = false
  }
  return { undo, history, stop }
}

const count = ref(0)
const { undo, history, stop } = useSyncUndo(count, {})

let a = false
function test() {
  function test2() {
    if (!a) console.log('a')
  }

  test2()
}
test()
a = true
test()
</script>

<template>
  <h1>{{ msg }}</h1>
  <p class="">
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button><br>
  <button type="button" @click="undo">undo</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
