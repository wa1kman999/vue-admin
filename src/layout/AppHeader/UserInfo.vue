<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.getUserInfo?.username }}
      <el-icon class="el-icon--right">
        <ArrowDown />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="handleLogout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
// import { logout } from '@/api/common'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { ArrowDown } from '@element-plus/icons-vue'
import { onMounted } from 'vue'

const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  console.log('打印')
  console.log(userStore.getUserInfo?.username)
})

const handleLogout = () => {
  // 退出提示
  ElMessageBox.confirm('确认退出吗？', '退出提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    // 确认发出退出请求
    // await logout()

    // 清除用户登录信息
    userStore.setUserInfo(null)

    ElMessage({
      type: 'success',
      message: '退出成功!'
    })

    // 跳转到登录页
    router.push({
      name: 'login'
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消退出'
    })
  })
}
</script>

<style lang="scss" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
