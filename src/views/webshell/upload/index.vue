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
            label="名字"
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
            label="大小"
            min-width="100"
            prop="size"
          />
          <el-table-column
            label="上次修改时间"
            min-width="100"
            prop="modTime"
          />
          <el-table-column
            align="center"
            label="操作"
            min-width="100"
          >
            <template #default="scope">
              <span><el-upload
                ref="uploadRef"
                action="xxx"
                :http-request="handleUpload"
                v-show="scope.row.isDir"
                :show-file-list="false"
              >
                <template #trigger>
                  <el-button
                    :disabled="!scope.row.isDir"
                    :icon="UploadFilled"
                    type="success"
                    @click="beforeUpload(scope.row)"
                  />
                </template>
              </el-upload></span>
              <el-button
                v-show="!scope.row.isDir"
                :icon="Download"
                type="warning"
                @click="downloadApiFunc(scope.row)"
              />

              <!-- <el-button
                :disabled="!scope.row.isDir"
                :icon="UploadFilled"
                type="success"
              /> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { getDir, uploadFile } from '@/api/server'
import { IDirInfo } from '@/api/types/serverModel'
import { router } from '@/router'
import { Search, Refresh, CaretTop, UploadFilled, Download, FolderOpened, Document, Platform } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

const tableData = ref<IDirInfo[]>([])
const route = useRoute()

const searchInfo = reactive({
  id: route.query.id as string,
  path: route.query.homePath as string
})
const uploadPath = ref('')

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
  console.log(row.name)
  uploadPath.value = row.name
}

const handleUpload = async ({ file }: { file: File }) => {
  await uploadFile({
    id: searchInfo.id,
    path: `${searchInfo.path}/${uploadPath.value}/`,
    file
  })
  ElMessage.success('上传成功')
}
// 下载操作
const downloadApiFunc = (row: IDirInfo) => {
  console.log(row.id)
}
// 查询
const getTableData = async () => {
  const table = await getDir(searchInfo)
  tableData.value = table
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

</style>
