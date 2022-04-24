<template>
  <h1>login</h1>
</template>

<script lang="ts" setup>
import { getLoginInfo } from '@/api/common'
import { onMounted } from 'vue'

onMounted(() => {
  getLoginInfo().then(
    res => {
      console.log(res)
    }
  ).catch(
    err => {
      console.log(err)
    }
  )
})

</script>
<style lang="scss" scoped>
</style>
