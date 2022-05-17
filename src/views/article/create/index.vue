<template>
  <el-card class="box-card">
    <el-form
      :model="form"
    >
      <el-row>
        <el-col
          :span="5"
          class="sub-title my-2 text-sm text-gray-600"
        >
          <el-form-item>
            <div>
              文章标题：
            </div>
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item>
            <div>
              文章分类：
            </div>
            <el-input
              v-model="form.name"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <div>
              文章描述：
            </div>
            <el-input
              :rows="3"
              type="textarea"
              placeholder="Please input"
              v-model="form.name"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-form-item>
            <div>
              缩略图：
            </div>
            <el-input
              v-model="form.name"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <div>
          文章内容：
        </div>
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})

</script>

<style scoped>

</style>
