<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#304156"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    router
    :collapse="collapseIcon"
  >
    <el-menu-item index="/">
      <el-icon>
        <LocationInformation />
      </el-icon>
      <span>首页</span>
    </el-menu-item>

    <el-sub-menu index="/product">
      <template #title>
        <el-icon>
          <ShoppingBag />
        </el-icon>
        <span>产品</span>
      </template>
      <el-menu-item index="/product/product_list">
        产品列表
      </el-menu-item>
      <el-menu-item index="/product/product_attr">
        产品规格
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="4">
      <el-icon>
        <setting />
      </el-icon>
      <span>权限</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import {
  LocationInformation,
  ShoppingBag,
  Setting
} from '@element-plus/icons-vue'
import { useToggleStore } from '@/store/modules/toggle'
import { computed } from 'vue'
const store = useToggleStore()
const collapseIcon = computed(() => {
  return store.getIsCollapse
})
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>
