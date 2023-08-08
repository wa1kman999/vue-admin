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
            <el-select
              v-model="form.cid"
              clearable
            >
              <el-option
                label="未知分类"
                :value="0"
              />
              <el-option
                v-for="item in categoryOptions"
                :key="item.ID"
                :label="item.name"
                :value="item.ID"
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
              action="xxx"
              :http-request="handleUpload"
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
          class="tinymce-container"
          @input="inputContent"
          :value="form.content"
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
import { onMounted, reactive, ref } from 'vue'
import TinymceEditor from '@/components/TinymceEditor.vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { getCategoryList } from '@/api/category'
import { ICategoryInfo } from '@/api/types/categoryModel'
import { CreateArticle, uploadFile, getArticle } from '@/api/article'
import { ElMessage } from 'element-plus'
import { router } from '@/router'

// 提交表单
const form = reactive({
  title: '',
  cid: 0,
  desc: '',
  img: '',
  content: ''
})

const inputContent = (content: string) => {
  form.content = content
}

// 分类选择项数组
const categoryOptions = ref<ICategoryInfo[]>([])

// 上传
const handleUpload = async ({ file }: { file: File }) => {
  const filePath = await uploadFile({
    file
  })
  form.img = filePath.path
  ElMessage.success('上传成功')
}

// 获取分类的选项
const getCategoryData = async () => {
  const categoryList = await getCategoryList({
    page: 1,
    pageSize: 1000
  })
  categoryOptions.value = categoryList.data
}

const onSubmit = async () => {
  await CreateArticle(form)
  ElMessage.success('新建成功')
}

// 获取单个文章

onMounted(async () => {
  const id = router.currentRoute.value.params.id as string
  if (id) {
    const a = await getArticle({ id })
    form.cid = a.category.ID
    form.content = a.content
    form.desc = a.desc
    form.title = a.title
    form.img = a.img
    console.log('打印form:', form)
  }
  getCategoryData()
}
)

// onMounted(() => {
//   // 获取分类的选项
//   getCategoryData()
// })

</script>

<style lang="scss" scoped>
.tinymce-container {
  width: 100%;
}
</style>
