<template>
  <div
    ref="xtermRef"
    id="xterm"
    class="xterm"
    style="width: calc(100%- 40px);padding: 0px;"
  />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
const xtermRef = ref<HTMLInputElement | null>(null)
let myws: WebSocket
let myterm: Terminal

// 挂在组件时
onMounted(() => {
  console.log('初始化')
  initTerm()
})

// // 销毁时
onBeforeUnmount(() => {
  myws.close()
  myterm.dispose()
  console.log('注销webshell')
})

// 初始化客户端
function initTerm () {
  const term = new Terminal()
  const ws = new WebSocket('ws://127.0.0.1:8080/ws')
  const attachAddon = new AttachAddon(ws)
  const fitAddon = new FitAddon()
  term.loadAddon(attachAddon)
  term.loadAddon(fitAddon)
  term.open(xtermRef.value as HTMLElement)
  fitAddon.fit()
  term.focus()
  myterm = term
  myws = ws
}
</script>

<style scoped>
</style>
