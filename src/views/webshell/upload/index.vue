<template>
  <div>
    <div class="search-container">
      <el-form
        ref="searchForm"
        :inline="true"
        :model="searchInfo"
      >
        <el-form-item label="当前路径">
          <el-input
            :prefix-icon="Search"
            v-model="searchInfo.path"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :icon="Search"
            @click="onSubmit"
          >
            查询
          </el-button>
          <el-button
            type="info"
            :icon="Refresh"
            @click="onReset"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-button
            type="primary"
            :icon="CaretTop"
            @click="backApiFunc"
          >
            上一级
          </el-button>
          <el-button
            type="info"
            :icon="Platform"
            @click="toServerList"
          >
            返回服务器列表
          </el-button>
        </div>
      </template>
      <div class="table-container">
        <el-table
          :data="tableData"
        >
          <el-table-column
            label="Name"
            min-width="100"
          >
            <template #default="scope">
              <div
                v-if="scope.row.isDir"
                style="display: flex; align-items: center"
              >
                <el-icon :size="17">
                  <FolderOpened />
                </el-icon>
                <el-button
                  type="text"
                  @click="pointApiFunc(scope.row)"
                >
                  {{ scope.row.name }}
                </el-button>
              </div>
              <div
                v-else
                style="display: flex; align-items: center"
              >
                <el-icon :size="17">
                  <Document />
                </el-icon>
                {{ scope.row.name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Size"
            min-width="100"
            prop="size"
          />
          <el-table-column
            label="Access"
            min-width="100"
            prop="mode"
          />
          <el-table-column
            label="Last modified"
            min-width="100"
            prop="modTime"
          />
          <el-table-column
            align="center"
            label="Operation"
            min-width="100"
          >
            <template #default="scope">
              <el-upload
                action="xxx"
                :show-file-list="false"
                v-if="isDir(scope.row.mode) === 'dir'"
                :http-request="handleUpload"
                :on-change="handleChange"
              >
                <template #trigger>
                  <el-button
                    :icon="UploadFilled"
                    type="primary"
                    @click="beforeUpload(scope.row)"
                  />
                </template>
              </el-upload>
              <el-button
                v-else-if="isDir(scope.row.mode) === 'file'"
                :icon="Download"
                type="success"
                @click="downloadApiFunc(scope.row)"
              />
              <el-button
                v-else
                :icon="QuestionFilled"
                type="info"
                @click="downloadApiFunc(scope.row)"
                :disabled="true"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { download, getDir, uploadFile } from '@/api/server'
import { IDirInfo } from '@/api/types/serverModel'
import { router } from '@/router'
import { Search, Refresh, CaretTop, UploadFilled, Download, FolderOpened, Document, Platform, QuestionFilled } from '@element-plus/icons-vue'
import { ElMessage, ElNotification, UploadProps } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

const tableData = ref<IDirInfo[]>([])
const route = useRoute()
const uploadPath = ref('')
const searchInfo = reactive({
  id: route.query.id as string,
  path: route.query.homePath as string
})

// 搜索提交
const onSubmit = async () => {
  getTableData()
}
// 重置搜索
const onReset = () => {
  searchInfo.path = route.query.homePath as string
  getTableData()
}
// 回到上一级目录
const handleBack = (path: string): string => {
  if (path === '/') {
    return path
  }
  const tempList = path.split('/')
  tempList.pop()
  if (tempList.length === 1) {
    if (tempList[0] === '') {
      return '/'
    }
  }
  return tempList.join('/')
}

// 返回上一级
const backApiFunc = () => {
  if (searchInfo.path === '/') {
    ElMessage.warning('已经到顶了')
  }
  searchInfo.path = handleBack(searchInfo.path)
  getTableData()
}

// 返回服务器列表
const toServerList = () => {
  router.push({ name: 'product_list' })
}
// 进入文件夹
const pointApiFunc = (row: IDirInfo) => {
  if (searchInfo.path === '/') {
    searchInfo.path = `${searchInfo.path}${row.name}`
  } else {
    searchInfo.path = `${searchInfo.path}/${row.name}`
  }
  getTableData()
}
const beforeUpload = (row: IDirInfo) => {
  uploadPath.value = row.name
}

// 上传
const handleUpload = async ({ file }: { file: File }) => {
  await uploadFile({
    id: searchInfo.id,
    path: `${searchInfo.path}/${uploadPath.value}/`,
    file
  })
  ElMessage.success('上传成功')
}
// 下载操作
const downloadApiFunc = async (row: IDirInfo) => {
  const fileData = await download({ id: searchInfo.id, path: searchInfo.path !== '/' ? `${searchInfo.path}/${row.name}` : `${searchInfo.path}${row.name}` })
  const link = document.createElement('a') // a标签下载
  link.href = URL.createObjectURL(fileData)
  link.download = row.name // dowload属性指定文件名
  link.click() // click()事件触发下载
  URL.revokeObjectURL(link.href) // 释放内存
  ElNotification.success('下载成功')
}
// 查询
const getTableData = async () => {
  const table = await getDir(searchInfo)
  tableData.value = table
}

// 判断是否是文件夹
const isDir = (s: string) => {
  if (s.startsWith('d')) {
    return 'dir'
  } else if (s.startsWith('-')) {
    return 'file'
  } else {
    return 'notall'
  }
}

// todo进度条
const handleChange: UploadProps['onChange'] = (uploadFile) => {
  console.log(uploadFile.name)
  console.log(uploadFile.percentage)
}
onMounted(() => {
  getTableData()
})

</script>
<style lang="scss" scoped>
.button-box {
  padding: 10px 20px;
  .el-button {
    float: right;
  }
}
.card-header {
  display: flex;
  // justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.box-card{
   height: 100%;
}

</style>
