<template>
  <div>
    <Xterm class="webshell" />
  </div>
</template>

<script setup lang="ts">
import Xterm from '@/components/Xterm.vue'
</script>

<style scoped>
.webshell {
  height: 100vh;
}
</style>
