<template>
  <div>
    <div class="search-container">
      <el-form
        ref="searchForm"
        :inline="true"
        :model="searchInfo"
      >
        <el-form-item label="分类名">
          <el-input
            :prefix-icon="Search"
            v-model="searchInfo.name"
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
            新增分类
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
          <!-- <el-table-column
            label="分类名"
            min-width="100"
            prop="name"
          /> -->
          <el-table-column
            label="分类名"
            prop="name"
            min-width="100"
          >
            <template #default="scope">
              <div>
                <el-popover
                  v-if="scope.row.name"
                  placement="left-start"
                  trigger="click"
                  @show="getTest(scope.row)"
                >
                  <div class="popover-box">
                    <pre>{{ fmtBody(testData) }}</pre>
                  </div>
                  <template #reference>
                    <el-icon style="cursor: pointer;">
                      查看
                    </el-icon>
                  </template>
                </el-popover>

                <span v-else>无</span>
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
import { getCategoryList, getCategoryTest } from '@/api/category'
import type { ICategoryInfo } from '@/api/types/categoryModel'
import { Search, Refresh, Plus, Edit, Delete } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'

// const page = ref(1)
const total = ref(0)
// const pageSize = ref(10)
const tableData = ref<ICategoryInfo[]>([])
const testData = ref('')

const searchInfo = reactive({
  page: 1,
  pageSize: 10,
  name: ''
})

// 搜索提交
const onSubmit = async () => {
  getTableData()
}
// 重置搜索
const onReset = () => {
  searchInfo.name = ''
  getTableData()
}

// 编辑操作
const editApiFunc = (row: ICategoryInfo) => {
  console.log(row.ID)
}

// 删除操作
const delApiFunc = (row: ICategoryInfo) => {
  console.log(row.name)
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
  const table = await getCategoryList(searchInfo)
  tableData.value = table.data
  total.value = table.total
}

// 获取测试数据
const getTest = async (row: ICategoryInfo) => {
  const t = await getCategoryTest({ name: row.name })
  testData.value = t.res as string
}

// 调用查询
getTableData()

const fmtBody = (value:string) => {
  try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
}
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
.popover-box {
  background: #112435;
  color: #f08047;
  height: 600px;
  width: 420px;
  overflow: auto;
}
.popover-box::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
