<template>
  <div>
    <div class="search-container">
      <el-form
        ref="searchForm"
        :inline="true"
        :model="searchInfo"
      >
        <el-form-item label="用户名">
          <el-input
            :prefix-icon="Search"
            v-model="searchInfo.userName"
          />
        </el-form-item>
        <el-form-item label="角色">
          <el-input
            :prefix-icon="Search"
            v-model="searchInfo.role"
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
    <div class="table-container">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="id"
        />
        <el-table-column
          prop="userName"
          label="用户名"
        />
        <el-table-column
          prop="role"
          label="角色"
        />
      </el-table>
      <div class="pagination-container">
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Search, Refresh } from '@element-plus/icons-vue'
import { ref } from 'vue'
const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const searchInfo = ref({
  userName: '',
  role: ''
})

const onSubmit = () => {
  console.log('tijiao')
}
const onReset = () => {
  console.log('重置')
}
const tableData = [
  {
    id: '2016-05-03',
    userName: 'Tom',
    role: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: '2016-05-02',
    userName: 'Tom',
    role: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: '2016-05-04',
    userName: 'Tom',
    role: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: '2016-05-01',
    userName: 'Tom',
    role: 'No. 189, Grove St, Los Angeles'
  }
]
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>
<style lang="scss" scoped>
.search-container {
  background-color: red;
}
.button-box {
  padding: 10px 20px;
  .el-button {
    float: right;
  }
}
.search-container {
    .el-collapse {
        border: none;
        .el-collapse-item__header,
        .el-collapse-item__wrap {
            border-bottom: none;
        }
    }
    padding: 24px;
    padding-bottom: 2px;
    background-color: #fff;
    border-radius: 2px;
    margin-bottom: 12px;
}
</style>
