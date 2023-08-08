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
            @click="createArticle"
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
                  :src="imgUrl(scope.row.img)"
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

              <el-popconfirm
                @confirm="delApiFunc(scope.row)"
                title="Are you sure to delete this?"
              >
                <template #reference>
                  <el-button
                    :icon="Delete"
                    type="danger"
                  />
                </template>
              </el-popconfirm>
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
import { getArticleList, DelArticle } from '@/api/article'
import { IArticleInfo } from '@/api/types/articleModel'
import { router } from '@/router'
import { Search, Refresh, Plus, Edit, Delete } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'

const total = ref(0)
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

// 新增文章
const createArticle = () => {
  router.replace({ name: 'create_article' })
}

// 编辑操作
const editApiFunc = (row: IArticleInfo) => {
  router.replace({ name: 'create_article', params: { id: row.ID } })
}

// 删除操作
const delApiFunc = async (row: IArticleInfo) => {
  await DelArticle({ id: row.ID })
  getTableData()
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

// 图片地址
const imgUrl = (path: string): string => {
  return `${import.meta.env.VITE_API_BASEURL}/goblog/v1/article/img/${path}`
}
// 调用查询
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
