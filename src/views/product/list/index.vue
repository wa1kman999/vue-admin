<template>
  <div class="table-container">
    <el-table
      :data="tableData"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        align="left"
        label="id"
        min-width="150"
        prop="id"
      />
      <el-table-column
        align="left"
        label="名字"
        min-width="150"
        prop="name"
      />
      <el-table-column
        align="left"
        label="ip地址"
        min-width="150"
        prop="ip"
      />
      <el-table-column
        align="left"
        label="备注"
        min-width="150"
        prop="mark"
      />
      <el-table-column
        align="left"
        label="操作"
        min-width="150"
      >
        <template #default="scope">
          <el-button
            icon="edit"
            size="small"
            type="text"
            @click="editApiFunc(scope.row)"
          >
            上传下载
          </el-button>
          <el-button
            icon="edit"
            size="small"
            type="text"
            @click="linkApiFunc(scope.row)"
          >
            连接
          </el-button>
          <el-button
            icon="delete"
            size="small"
            type="text"
            @click="delApiFunc(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :current-page="page"
        :page-size="pageSize"
        :page-sizes="[10, 30, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getServerList, pwd } from '@/api/server'
import { IServerInfo } from '@/api/types/serverModel'
import { router } from '@/router'
// import { useServerStore } from '@/store/modules/server'
import { ref } from 'vue'

const dialogVisible = ref(false)
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref<IServerInfo[]>([])
// const store = useServerStore()

// 新窗口打开webshell
const routerJump = (param: string) => {
  // resolve新窗口打开
  const newpage = router.resolve({
    path: '/webshell', // 跳转的页面路由
    query: { // 要传的参数
      id: param
    }
  })
  window.open(newpage.href, '_blank') // 打开新的窗口(跳转路径，跳转类型)
}
// 编辑操作
const editApiFunc = async (row: IServerInfo) => {
  console.log(row.id)
  const homePath = await pwd({ id: row.id })
  // store.setServerId(row.id)
  // store.setHomePath(homePath.path)
  router.push({ path: '/product/product_attr', query: { id: row.id, homePath: homePath.path } })
}

// 连接操作
const linkApiFunc = (row: IServerInfo) => {
  console.log(row)
  // window.open(newPage.href, '_blank')
  routerJump(row.id)
  dialogVisible.value = true
}
// 删除操作
const delApiFunc = (row: IServerInfo) => {
  console.log(row.name)
}
// 分页
const handleSizeChange = (val: number) => {
  pageSize.value = val
  getTableData()
}

const handleCurrentChange = (val: number) => {
  page.value = val
  getTableData()
}
// 查询
const getTableData = async () => {
  const table = await getServerList({ page: page.value, pageSize: pageSize.value })
  console.log(table)
  tableData.value = table.data
  total.value = table.pagination.total
  page.value = table.pagination.page
  pageSize.value = table.pagination.pageSize
}
// 调用查询
getTableData()

</script>

<style scoped>

</style>
