<template>
  <i
    @click="onToggle"
  ><el-icon><FullScreen /></el-icon>
  </i>
</template>

<script lang="ts" setup>
import { FullScreen } from '@element-plus/icons-vue'
import { onMounted, onUnmounted, ref } from 'vue'
import screenfull from 'screenfull'
// 是否全屏
const isFullscreen = ref(false)
// 监听变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
// 切换事件
const onToggle = () => {
  screenfull.toggle()
}

// 设置监听器
onMounted(() => {
  screenfull.on('change', change)
})

// 删除监听器
onUnmounted(() => {
  screenfull.off('change', change)
})

</script>

<style lang="scss" scoped></style>
