<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#304156"
    class="el-menu-vertical-demo"
    text-color="#fff"
    router
    :collapse="collapseIcon"
    unique-opened
  >
    <el-menu-item index="/">
      <el-icon>
        <Compass />
      </el-icon>
      <span>首页</span>
    </el-menu-item>

    <el-sub-menu index="/product">
      <template #title>
        <el-icon>
          <Platform />
        </el-icon>
        <span>服务器</span>
      </template>
      <el-menu-item index="/product/product_list">
        服务器列表
      </el-menu-item>
      <!-- <el-menu-item
        index="/product/product_attr"
        disabled
      >
        上传下载
      </el-menu-item> -->
    </el-sub-menu>
    <el-sub-menu index="/article">
      <template #title>
        <el-icon>
          <Notebook />
        </el-icon>
        <span>文章</span>
      </template>
      <el-menu-item index="/article/article_list">
        文章列表
      </el-menu-item>
      <el-menu-item index="/article/create_article">
        编辑文章
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/category/category_list">
      <el-icon>
        <Operation />
      </el-icon>
      <span>分类管理</span>
    </el-menu-item>
    <el-menu-item index="/account/account_list">
      <el-icon>
        <User />
      </el-icon>
      <span>账号管理</span>
    </el-menu-item>
    <el-menu-item index="/system/system_state">
      <el-icon>
        <Cpu />
      </el-icon>
      <span>服务器状态</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import {
  Compass,
  Platform,
  Notebook,
  User,
  Operation,
  Cpu
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
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
