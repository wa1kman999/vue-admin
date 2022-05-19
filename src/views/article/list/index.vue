<template>
  <div>
    <div class="search-container">
      <el-form
        ref="searchForm"
        :inline="true"
        :model="searchInfo"
      >
        <el-form-item label="标题名">
          <el-input
            :prefix-icon="Search"
            v-model="searchInfo.title"
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
            :icon="Plus"
          >
            新增文章
          </el-button>
        </div>
      </template>
      <div class="table-container">
        <el-table
          :data="tableData"
        >
          <el-table-column
            label="id"
            min-width="100"
            prop="ID"
          />
          <el-table-column
            label="分类名"
            min-width="100"
            prop="category.name"
          />
          <el-table-column
            label="标题名"
            min-width="100"
            prop="title"
          />
          <el-table-column
            label="描述"
            min-width="100"
            prop="desc"
          />
          <el-table-column
            label="缩略图"
            min-width="100"
          >
            <template #default="scope">
              <div>
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.img"
                  :initial-index="4"
                  fit="cover"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            min-width="100"
          >
            <template #default="scope">
              <el-button
                :icon="Edit"
                type="primary"
                @click="editApiFunc(scope.row)"
              />
              <el-button
                :icon="Delete"
                type="danger"
                @click="delApiFunc(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            :current-page="searchInfo.page"
            :page-size="searchInfo.pageSize"
            :page-sizes="[10, 30, 50, 100]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { getArticleList } from '@/api/article'
import { IArticleInfo } from '@/api/types/articleModel'
import { Search, Refresh, Plus, Edit, Delete } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'

// const page = ref(1)
const total = ref(0)
// const pageSize = ref(10)
const tableData = ref<IArticleInfo[]>([])

const searchInfo = reactive({
  page: 1,
  pageSize: 10,
  title: ''
})

// 搜索提交
const onSubmit = async () => {
  getTableData()
}
// 重置搜索
const onReset = () => {
  searchInfo.title = ''
  getTableData()
}

// 编辑操作
const editApiFunc = (row: IArticleInfo) => {
  console.log(row.id)
}

// 删除操作
const delApiFunc = (row: IArticleInfo) => {
  console.log(row.title)
}
// 分页
const handleSizeChange = (val: number) => {
  searchInfo.pageSize = val
  getTableData()
}

const handleCurrentChange = (val: number) => {
  searchInfo.page = val
  getTableData()
}
// 查询
const getTableData = async () => {
  const table = await getArticleList(searchInfo)
  tableData.value = table.data
  total.value = table.total
}
// 调用查询
getTableData()
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
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

</style>
