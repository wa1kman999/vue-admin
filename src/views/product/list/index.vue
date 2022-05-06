<template>
  <div class="table-container">
    <div class="gva-btn-list">
      <el-button
        type="primary"
        icon="plus"
        @click="openDialog('addApi')"
      >
        新增
      </el-button>
      <el-popover
        v-model:visible="deleteVisible"
        placement="top"
        width="160"
      >
        <p>确定要删除吗？</p>
        <div style="text-align: right; margin-top: 8px;">
          <el-button
            size="small"
            type="text"
            @click="deleteVisible = false"
          >
            取消
          </el-button>
          <el-button
            size="small"
            type="primary"
            @click="onDelete"
          >
            确定
          </el-button>
        </div>
        <template #reference>
          <el-button
            icon="delete"
            :disabled="!tableData.length"
            style="margin-left: 10px;"
            @click="deleteVisible = true"
          >
            删除
          </el-button>
        </template>
      </el-popover>
    </div>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        align="left"
        label="id"
        min-width="60"
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
      <!-- <el-table-column
        align="left"
        label="请求"
        min-width="150"
        prop="method"
        sortable="custom"
      >
        <template #default="scope">
          <div>
            {{ scope.row.method }} / {{ methodFiletr(scope.row.method) }}
          </div>
        </template>
      </el-table-column> -->

      <el-table-column
        align="left"
        fixed="right"
        label="操作"
        width="200"
      >
        <template #default="scope">
          <el-button
            icon="edit"
            size="small"
            type="text"
            @click="editApiFunc(scope.row)"
          >
            编辑
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

    <el-dialog
      v-model="dialogFormVisible"
      :title="dialogTitle"
    >
      <el-form
        ref="serverFormRef"
        :model="form"
        label-width="80px"
      >
        <el-form-item
          label="名字"
          prop="name"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="ip"
          prop="ip"
        >
          <el-input
            v-model="form.ip"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="账号"
          prop="user"
        >
          <el-input
            v-model="form.user"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="form.password"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            size="small"
            @click="closeDialog(serverFormRef)"
          >
            取 消
          </el-button>
          <el-button
            size="small"
            type="primary"
          >
            确 定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getServerList } from '@/api/server'
import { IServerInfo } from '@/api/types/serverModel'
import { router } from '@/router'
import { FormInstance } from 'element-plus'
import { ref } from 'vue'

const dialogVisible = ref(false)
const deleteVisible = ref(false)
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref<IServerInfo[]>([])
// 表单
const form = ref({
  name: '',
  ip: '',
  user: '',
  password: '',
  mark: ''
})
// const searchInfo = ref({})
// 弹窗
const dialogTitle = ref('新增Api')
const dialogFormVisible = ref(false)

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
const editApiFunc = (row: IServerInfo) => {
  console.log(row.id)
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
// 打开弹窗
const openDialog = (key:string) => {
  switch (key) {
    case 'addApi':
      dialogTitle.value = '新增Api'
      break
    case 'edit':
      dialogTitle.value = '编辑Api'
      break
    default:
      break
  }
  dialogFormVisible.value = true
}
const closeDialog = (formEl: FormInstance | undefined) => {
  resetForm(formEl)
  dialogFormVisible.value = false
}

// 重置表单
const serverFormRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 删除操作
const onDelete = async () => {
  const ids = tableData.value.map(item => item.id)
  console.log(ids)
  // const res = await deleteApisByIds({ ids })
  // if (res.code === 0) {
  //   ElMessage({
  //     type: 'success',
  //     message: res.msg
  //   })
  //   if (tableData.value.length === ids.length && page.value > 1) {
  //     page.value--
  //   }
  //   deleteVisible.value = false
  //   getTableData()
  // }
}

// 多选
const handleSelectionChange = (val: IServerInfo[]) => {
  tableData.value = val
}
</script>

<style scoped>

</style>
