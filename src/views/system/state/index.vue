<template>
  <div>
    <el-row
      :gutter="15"
      class="system_state"
    >
      <el-col :span="12">
        <el-card
          v-if="state.os"
          class="card_item"
        >
          <template #header>
            <div>Runtime</div>
          </template>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">
                os:
              </el-col>
              <el-col
                :span="12"
                v-text="state.os.goos"
              />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                cpu nums:
              </el-col>
              <el-col
                :span="12"
                v-text="state.os.numCpu"
              />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                compiler:
              </el-col>
              <el-col
                :span="12"
                v-text="state.os.compiler"
              />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                go version:
              </el-col>
              <el-col
                :span="12"
                v-text="state.os.goVersion"
              />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                goroutine nums:
              </el-col>
              <el-col
                :span="12"
                v-text="state.os.numGoroutine"
              />
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card
          v-if="state.disk"
          class="card_item"
        >
          <template #header>
            <div>Disk</div>
          </template>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row :gutter="10">
                  <el-col :span="12">
                    total (MB)
                  </el-col>
                  <el-col
                    :span="12"
                    v-text="state.disk.totalMb"
                  />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    used (MB)
                  </el-col>
                  <el-col
                    :span="12"
                    v-text="state.disk.usedMb"
                  />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    total (GB)
                  </el-col>
                  <el-col
                    :span="12"
                    v-text="state.disk.totalGb"
                  />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    used (GB)
                  </el-col>
                  <el-col
                    :span="12"
                    v-text="state.disk.usedGb"
                  />
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-progress
                  type="dashboard"
                  :percentage="state.disk.usedPercent"
                  :color="colors"
                />
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row
      :gutter="15"
      class="system_state"
    >
      <el-col :span="12">
        <el-card
          v-if="state.cpu"
          class="card_item"
          :body-style="{ height: '180px', 'overflow-y': 'scroll' }"
        >
          <template #header>
            <div>CPU</div>
          </template>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">
                physical number of cores:
              </el-col>
              <el-col
                :span="12"
                v-text="state.cpu.cores"
              />
            </el-row>
            <el-row
              v-for="(item, index) in state.cpu.cpus"
              :key="index"
              :gutter="10"
            >
              <el-col :span="12">
                core {{ index }}:
              </el-col>
              <el-col
                :span="12"
              >
                <el-progress
                  type="line"
                  :percentage="+item.toFixed(0)"
                  :color="colors"
                />
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card
          v-if="state.ram"
          class="card_item"
        >
          <template #header>
            <div>Ram</div>
          </template>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row :gutter="10">
                  <el-col :span="12">
                    total (MB)
                  </el-col>
                  <el-col
                    :span="12"
                    v-text="state.ram.totalMb"
                  />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    used (MB)
                  </el-col>
                  <el-col
                    :span="12"
                    v-text="state.ram.usedMb"
                  />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    total (GB)
                  </el-col>
                  <el-col
                    :span="12"
                    v-text="state.ram.totalMb / 1024"
                  />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    used (GB)
                  </el-col>
                  <el-col
                    :span="12"
                    v-text="(state.ram.usedMb / 1024).toFixed(2)"
                  />
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-progress
                  type="dashboard"
                  :percentage="state.ram.usedPercent"
                  :color="colors"
                />
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { stateApi } from '@/api/system'
import { ref, reactive, onUnmounted } from 'vue'
import { IStateResp } from '@/api/types/systemModel'
// eslint-disable-next-line no-undef
const timer = ref<NodeJS.Timer | null>(null)
const state = reactive<IStateResp>({
  cpu: {
    cpus: [],
    cores: 0
  },
  os: {
    goos: '',
    numCpu: 0,
    compiler: '',
    goVersion: '',
    numGoroutine: 0
  },
  ram: {
    usedMb: 0,
    totalMb: 0,
    usedPercent: 0
  },
  disk: {
    usedMb: 0,
    usedGb: 0,
    totalMb: 0,
    totalGb: 0,
    usedPercent: 0
  }
})
const colors = ref([
  { color: '#5cb87a', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#f56c6c', percentage: 80 }
])

const reload = async () => {
  const data = await stateApi()
  state.cpu = data.cpu
  state.disk = data.disk
  state.os = data.os
  state.ram = data.ram
}

reload()

timer.value = setInterval(() => {
  reload()
}, 1000 * 10)

onUnmounted(() => {
  clearInterval(Number(timer.value))
  timer.value = null
})

</script>

<style>
.system_state {
  padding: 10px;
}

.card_item {
  height: 280px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
