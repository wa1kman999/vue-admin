<script lang="ts" setup>
import { useStore } from '@/store'
const demo = useStore()
console.log(demo.doublePlusOne)
console.log(demo.doubleCount)
</script>
<template>
  <h1>首页</h1>
</template>

<style lang="scss" scoped>
h1 {
  color: $color;
}
</style>
