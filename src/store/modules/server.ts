import { defineStore } from 'pinia'

interface ServerState {
  serverId?: string
  currentPath?: string
  homePath?: string
}

export const useServerStore = defineStore({
  id: 'app-server',
  state: (): ServerState => ({
    serverId: undefined,
    currentPath: undefined,
    homePath: undefined
  }),
  getters: {
    getServerId (): string | undefined {
      return this.serverId
    },
    getCurrentPath (): string | undefined {
      return this.currentPath
    },
    gethomePath (): string | undefined {
      return this.homePath
    }
  },
  actions: {
    setServerId (info: string | undefined) {
      this.serverId = info || ''
    },
    setCurrentPath (info: string | undefined) {
      this.currentPath = info || ''
    },
    setHomePath (info: string | undefined) {
      this.homePath = info || ''
    }
  }
})
