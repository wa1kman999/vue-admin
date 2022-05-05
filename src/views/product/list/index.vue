<template>
  <div>
    <!-- <el-dialog
      v-model="dialogVisible"
      draggable
      destroy-on-close
      :close-on-click-modal="false"
    >
      <div class="xterm-container">
        <Xterm />
      </div>
    </el-dialog> -->
    <Xterm v-show="dialogVisible" />
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="Date"
      />
      <el-table-column
        prop="name"
        label="Name"
      />
      <el-table-column
        prop="address"
        label="Address"
      />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="large"
            @click="handleEdit(scope.$index, scope.row)"
          >
            连接
          </el-button>

          <el-button
            size="large"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Xterm from '@/components/Xterm.vue'

interface User {
  date: string
  name: string
  address: string
}
const dialogVisible = ref(false)

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
  dialogVisible.value = true
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row.name)
}
const tableData = [
  {
    date: '2016-05-03',
    name: '小蒋狗',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: '小蒋狗',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: '小蒋狗',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: '小蒋狗',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>

<style scoped>

</style>
