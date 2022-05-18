<template>
  <el-card class="box-card">
    <el-form
      :model="form"
      label-position="top"
    >
      <el-row>
        <el-col
          :span="5"
          class="sub-title my-2 text-sm text-gray-600"
        >
          <el-form-item label="文章标题:">
            <el-input
              v-model="form.title"
              placeholder="请输入标题"
            />
          </el-form-item>
          <el-form-item label="文章分类:">
            <el-select>
              <el-option
                v-for="item in categoryoOtions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="文章描述:">
            <el-input
              :rows="3"
              type="textarea"
              placeholder="请输入描述"
              v-model="form.desc"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-form-item label="缩略图:">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
            >
              <el-button type="primary">
                <el-icon class="el-icon--left">
                  <UploadFilled />
                </el-icon>
                点击上传
              </el-button>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 500KB.
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="文章内容:"
      >
        <TinymceEditor
          v-model="form.content"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          Create
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import TinymceEditor from '@/components/TinymceEditor.vue'
import { UploadFilled } from '@element-plus/icons-vue'

// do not use same name with ref
const form = reactive({
  title: '',
  category: '',
  desc: '',
  img: '',
  content: ''
})

// 分类的选项
const categoryoOtions = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
]

const onSubmit = () => {
  console.log('submit!')
}

</script>

<style lang="scss" scoped>
</style>
