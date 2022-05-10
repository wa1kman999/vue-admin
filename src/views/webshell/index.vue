<template>
  <!-- <div>
    <Xterm class="webshell" />
  </div> -->
  <div class="common-layout">
    <el-container>
      <el-aside>
        <div class="aside-container">
          <el-upload
            ref="uploadRef"
            class="upload-demo"
            action="xxx"
            :http-request="handleUpload"
            :auto-upload="false"
          >
            <template #trigger>
              <el-button type="primary">
                选择文件
              </el-button>
            </template>

            <el-button
              class="ml-3"
              type="success"
              @click="submitUpload"
            >
              选择路径并上传
            </el-button>

            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
              </div>
            </template>
          </el-upload>
        </div>
      </el-aside>
      <el-main>
        <div class="webshell-container">
          <Xterm class="webshell" />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Xterm from '@/components/Xterm.vue'
import { ref } from 'vue'
import type { UploadInstance } from 'element-plus'
import { uploadFile } from '@/api/server'
import { useRoute } from 'vue-router'

const uploadRef = ref<UploadInstance>()
const route = useRoute()

const handleUpload = async ({ file }: { file: File }) => {
  console.log(file)
  await uploadFile({
    id: route.query.id as string,
    path: '/home/jf/',
    file
  })
  console.log('上传')
}
const submitUpload = () => {
  uploadRef.value!.submit()
}
</script>

<style scoped>
.webshell {
  height: 100vh;
}
.el-aside {
  background-color: #E9EEF3;
  color: #333;
  width: auto;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  padding: 0;
}
.aside-container {
  padding: 30px;
}
.webshell-container {
  padding-top: 30px;
}
.el-table {
  background-color: #E9EEF3;
}
</style>
