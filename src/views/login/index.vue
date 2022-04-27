<template>
  <div class="login-container">
    <el-form
      ref="ruleFormRef"
      :model="loginForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="login-form"
    >
      <div class="login-form_header">
        标注系统
      </div>
      <el-form-item
        prop="userName"
        class="input-username"
      >
        <el-input
          v-model="loginForm.userName"
          autocomplete="off"
          :prefix-icon="User"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item
        prop="passWord"
        class="input-passwd"
      >
        <el-input
          v-model="loginForm.passWord"
          type="password"
          autocomplete="off"
          :prefix-icon="Lock"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm(ruleFormRef)"
          class="submit-button"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {
  User,
  Lock
} from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

const ruleFormRef = ref<FormInstance>()

const loginForm = reactive({
  userName: '',
  passWord: ''
})

const rules = reactive<FormRules>({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  passWord: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      console.log('submit')
      const data = await userStore.login(loginForm).then(() => {
        console.log('xxx')
      }).catch((error) => {
        console.log(error)
      }

      )
      console.log(data)
    } else {
      console.log('error submit!')
      return false
    }
  })
}

</script>

<style lang="scss" scoped>
.login-container {
  min-width: 400px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
  }
.login-form {
  padding: 40px;
  background-color: azure;
  min-width: 500px;
  min-height: 250px;
  .login-form_header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
    font-size: large;
  }

  .input-username {
    margin-right: 50px;
  }
  .input-passwd {
    margin-top: 60px;
    margin-right: 50px;
  }
  .submit-button {
    width: 330px;
    margin-top: 30px;
  }
}
</style>
