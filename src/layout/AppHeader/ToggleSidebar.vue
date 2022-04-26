<template>
  <i
    v-if="collapseIcon"
    @click="handleCollapse"
  ><el-icon>
    <Expand />
  </el-icon>
  </i>
  <i
    v-else
    @click="handleCollapse"
  ><el-icon>
    <Fold />
  </el-icon>
  </i>
</template>

<script lang="ts" setup>
import { useToggleStore } from '@/store/modules/toggle'
import { computed } from 'vue'
import {
  Expand,
  Fold
} from '@element-plus/icons-vue'
const store = useToggleStore()
const collapseIcon = computed(() => {
  return !store.getIsCollapse
})
const handleCollapse = () => {
  store.setCollapse(!store.getIsCollapse)
}
</script>

<style lang="scss" scoped></style>
