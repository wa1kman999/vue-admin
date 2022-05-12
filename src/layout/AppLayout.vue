<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <AppMenu />
      </el-aside>
      <el-container>
        <el-header>
          <AppHeader />
        </el-header>
        <el-main>
          <router-view />
          <el-backtop
            :right="100"
            :bottom="100"
            target=".el-main"
            :visibility-height="20"
          />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import AppMenu from './AppMenu/index.vue'
import AppHeader from './AppHeader/index.vue'
</script>
<style lang="scss" scoped>
.el-header{
  background-color: #fff;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-aside {
  background-color: #304156;
  color: #333;
  width: auto;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  height: 100vh;
}

.el-container {
  height: 100vh;
}
</style>
